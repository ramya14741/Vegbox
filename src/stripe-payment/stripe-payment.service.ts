import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { requestInfodto } from './requestInfo.dto';
//const Stripe = require("stripe");
const dotenv =require('dotenv');
import Stripe from 'stripe';
import * as crypto from 'crypto';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';
import { DirectbuyService } from '../directbuy/directbuy.service';
dotenv.config();
const bodyParser = require('body-parser');


@Injectable()
export class StripePaymentService {
     private readonly stripe:  Stripe;
    
     

  constructor(private directBuyService: DirectbuyService,private cartService: CartService, private orderService: OrderService, private productService: ProductService) {
    this.stripe = new Stripe(process.env.stripesecret as string, {
      apiVersion: '2023-10-16', // Use the latest API version
    });
    
  }

  async generateClientSecret(money: number, currency: string, cartId:number,directBuyId:number, orderId:number, email:string) {
    try{
        const cartTotal = directBuyId == 0 ? await this.cartService.getCartbyId(cartId): await this.directBuyService.getdirectbuybyId(directBuyId);
        const cartItems: any[] = cartTotal[0].cartJson as any[];
        // const lineItems:{} = cartItems.map(async (product) => ({
        //   price_data: {
        //     currency: "INR", // Use the provided currency
        //     product_data: {
        //       name: product.name,
        //       description: product.description,
        //       images: [product.imageUrl],
        //     },
        //     unit_amount: await this.productService.calculateEachProductPrice(product), // Price in cents
            
        //   },
        //   quantity: product.quantity,
        // }));
        const discountApplied = cartTotal[0].getDataValue('discountApplied');
        const moneytobepaid = cartTotal[0].getDataValue('discountApplied') == 'N' ? cartTotal[0].getDataValue('cartTotal'):cartTotal[0].getDataValue('cartTotalAfterDiscount')
        const amount = Math.round(moneytobepaid * 100);
        const shippingCost = 500; // Example shipping cost in cents (e.g., $5.00)
        const lineItems = [];
        const customer = await this.stripe.customers.create({
          email,
          
        });
      
        
       // await this.stripe.invoices.sendInvoice(invoice.id);

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount:amount,
          currency:currency,
          customer: customer.id,
          description: 'Payment for order',
          receipt_email:email,
          
         

        });

        const invoice = await this.stripe.invoices.create({
          customer: customer.id, // Replace with the actual customer ID from your database
  // Replace with the default payment method ID if applicable
  currency: currency, // Replace with your desired currency code
  description: `Invoice for your order`,
  
// metadata: {
//     lineItems: JSON.stringify(lineItems), // Store line items in metadata
//   },
 
        });
        //const stripeInstance = this.stripe.getStripeInstance(); 

        
        for (const cartItem of cartItems) {
          let amount:any= await this.productService.calculateEachProductPrice(cartItem); // Calculate amount (price in cents)
          //const finalPrice =Math.round(amount * 100);
          // Create invoice item for each cart item
          const eachProductPrice = Math.round(amount.price_basedon_unitchoosen * 100);
          const invoiceItem = await this.stripe.invoiceItems.create({
            invoice: invoice.id,
            customer: customer.id,
            currency: currency,
           amount: eachProductPrice,
            description: `Invoice for items: ${JSON.stringify(cartItem)}`,

            // Other properties as needed for each invoice item
          });
          lineItems.push(invoiceItem); 
        }
        const shippingItem = await this.stripe.invoiceItems.create({
          invoice: invoice.id,
          customer: customer.id,
          currency: currency,
          amount: shippingCost,
          description: 'Shipping Cost', // Description for shipping cost line item
          // Other properties for shipping cost item
        });
      
        lineItems.push(shippingItem);
       await this.stripe.invoices.finalizeInvoice(invoice.id);
        
        const res ={
            paymentIntent:paymentIntent,
            clientSecret:paymentIntent.client_secret,
            cartTotal:cartTotal,
            moneytobepaid:moneytobepaid,
            discountApplied:discountApplied
        }
        const updateOrder = await this.orderService.updatePaymentIntent(orderId,paymentIntent, invoice.id);
        return res; 
    }
    catch(e){
        throw e;
    }
    
  }

  async constructEvent(payload: any, signature: string) {
    const stripe = require('stripe')(process.env.stripesecret as string);
    const endpointSecret = process.env.stripewebooksecret; 
    try {
      const res =  stripe.webhooks.constructEvent(payload, signature, endpointSecret);
      const updatewebhookpaymentStatus = await this.onPaymentIntentCompleted(res);
      return res;
    } catch (error) {
      throw new Error('Webhook signature verification failed.');
    }
  }

async onPaymentIntentCompleted(paymentIntent){
  paymentIntent.data.object.client_secret
  const clientSecret = paymentIntent.data.object.client_secret; 
  const paymentstatus  = await this.orderService.updateOrderPaidStatus(clientSecret,paymentIntent.data.object.status);
  return paymentstatus;
}
async createCheckoutSession(products: any[], successUrl: string, cancelUrl: string) {
  try {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((product) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.imageUrl],
          },
          unit_amount: product.price * 100, // Price in cents
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return undefined;
  }
}

async verifyStripeSignature(signature: string, rawPayload: string, secretKey: string): Promise<boolean> {
  const [timestamp, v1Signature, v0Signature] = signature.split(',');

  // Construct the signature data by concatenating timestamp and raw payload
  const sigData = `${timestamp}.${rawPayload}`;

  // Reconstruct the signatures using the secret key and signature data
  const reconstructedV1 = crypto.createHmac('sha256', secretKey).update(sigData).digest('hex');
  const reconstructedV0 = crypto.createHmac('sha256', secretKey).update(sigData).digest('hex');

  // Compare reconstructed signatures with the received signatures
  const isV1Valid = crypto.timingSafeEqual(Buffer.from(reconstructedV1), Buffer.from(v1Signature.slice(3)));
  const isV0Valid = crypto.timingSafeEqual(Buffer.from(reconstructedV0), Buffer.from(v0Signature.slice(3)));

  return isV1Valid || isV0Valid;
}

async getInvoiceFromPaymentIntent(invoiceid: string): Promise<Stripe.Invoice | null> {
  try {
    const invoice = await this.stripe.invoices.retrieve(invoiceid,
      { expand: ['lines.data']});

    
      return invoice;
    } 
  catch (error) {
    console.error('Error retrieving invoice from PaymentIntent:', error);
    return null;
  }
}

async createCustomer(email: string): Promise<Stripe.Customer | null> {
  try {
    const customer = await this.stripe.customers.create({
      email,
    });
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
}

async  createInvoice(customerId: string, amount: number, description: string) {
  try {
    // Create an invoice item
    const invoiceItem = await this.stripe.invoiceItems.create({
      customer: customerId,
      amount,
      currency: 'usd', // Replace with your currency
      description,
    });

    // Create an invoice
    const invoice = await this.stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice', // Define your collection method
      days_until_due: 30, // Define the number of days until the invoice is due
      auto_advance: true, // Automatically advance to the next invoice status upon successful payment
    });

    return { invoiceItem, invoice };
  } catch (error) {
    throw new Error(error.message);
  }
}

async getRevenue(fromDateStr: Date, toDateStr: Date): Promise<number> {
  const fromDate = new Date(fromDateStr);
  const toDate = new Date(toDateStr);
  const fromTimestamp = Math.floor(fromDate.getTime() / 1000); // Convert to UNIX timestamp
  const toTimestamp = Math.floor(toDate.getTime() / 1000); // Convert to UNIX timestamp

  try {
    const payments = await this.stripe.charges.list({
      created: {
        gte: fromTimestamp,
        lte: toTimestamp,
      },
      limit: 100, // Limit to 100 charges, adjust based on your requirements
    });

    // Calculate total revenue from the charges within the date range
    const totalRevenue = payments.data.reduce(
      (acc: number, charge: Stripe.Charge) => acc + (charge.amount || 0),
      0
    );

    return totalRevenue / 100; // Convert from cents to dollars (or your currency)
  } catch (error) {
    console.error('Error retrieving revenue:', error);
    throw error;
  }
}

async processRefund(paymentIntentId, cartItems): Promise<any> {
  try {
    const refundItems =[]
    for (const cartItem of cartItems) {
      let amount:any= await this.productService.calculateEachProductPrice(cartItem); // Calculate amount (price in cents)
     const eachProductPrice = Math.round(amount.price_basedon_unitchoosen * 100);
      const refundItem = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: eachProductPrice, // Convert amount to cents
      });
      
      refundItems.push(refundItem); 
    }

  return refundItems;
  } catch (error) {
    console.error('Error processing refund:', error);
    throw error;
  }
}

async getRefundedReceiptsFromPaymentIntent(paymentIntentId: string): Promise<Stripe.ApiListPromise<Stripe.Refund>> {
  try {
    // Retrieve refunded receipts for a specific Payment Intent
    const refunds = await this.stripe.refunds.list({
      payment_intent: paymentIntentId,
    });

    return refunds;
  } catch (error) {
    throw error;
  }
}
}
