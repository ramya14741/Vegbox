import { Body, Controller, Get, HttpCode, Param, Post, Headers, Req,RawBodyRequest, Res, UseGuards } from '@nestjs/common';
import { StripePaymentService } from './stripe-payment.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import Stripe from 'stripe'; // Import Stripe types or interfaces
const dotenv =require('dotenv');
dotenv.config();
import raw from 'raw-body';
const { Readable } = require('stream');
import sharp from 'sharp';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('stripe-payment')
@Controller('stripe-payment')
export class StripePaymentController {
  private readonly client: Stripe;
    constructor(private readonly stripeService: StripePaymentService) {
      this.client = new Stripe(process.env.stripesecret as string, {
        apiVersion: '2023-10-16', // Use the latest API version
      });
    }
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Get('client-secret/:amount/:currency/:cartId/:orderId/:customerEmail/:directBuyId')
  async getClientSecret(
    @Param('amount') amount: number,
    @Param('currency') currency: string,
    @Param('customerEmail') customerEmail: string,
    @Param('cartId') cartId: number,
    @Param('directBuyId') directBuyId: number,
    @Param('orderId') orderId: number,
  ){
    const clientSecret = await this.stripeService.generateClientSecret(amount, currency, cartId,directBuyId, orderId, customerEmail);
    return { clientSecret };
  }

  @Post('payment_intent')
  //@HttpCode(200)
   
  @ApiBody({ description: 'Raw JSON data' })
  async handlePaymentIntentWebhook(@Req() request: any,@Headers('stripe-signature') stripeSignature: string) {
   // try {
  //     let rawPayload = '';
  //   request.on('body', chunk => {
  //     rawPayload += chunk.toString(); // Concatenate chunks to form the raw payload
  //   });
  //   const payload =  Buffer.from(JSON.stringify(request.body), 'utf-8');;
  //   console.log('ramya',JSON.stringify(request.body))
  //   console.log('ramya1',String(request.body))
  //   console.log('ramya2',(request.body).toString())
  //  // const isSignatureValid1 = await this.stripeService.constructEvent(stripeSignature, request.body.data.object.client_secret);
  //    const isSignatureValid = await this.stripeService.constructEvent(stripeSignature, payload);
  //     if (isSignatureValid.type === 'payment_intent.succeeded') {
  //       console.log('Payment succeeded:', isSignatureValid.data.object);
  //     } else if (isSignatureValid.type === 'payment_intent.payment_failed') {
  //       console.log('Payment failed:', isSignatureValid.data.object);
  //     }

  //     return { received: true };
  //   request.on('end', async () => {
      // Perform signature verification using the Stripe service method
     // const isSignatureValid = await this.stripeService.constructEvent(stripeSignature, rawPayload);
      // if (isSignatureValid.type === 'payment_intent.succeeded') {
      //   console.log('Payment succeeded:', isSignatureValid.data.object);
      // } else if (event.type === 'payment_intent.payment_failed') {
      //   console.log('Payment failed:', isSignatureValid.data.object);
      // }

      //return { received: true };
      // Rest of your webhook handling logic
      // ...
   //});
      // const rawPayload = await raw(request, { encoding: 'utf8' });
      //   const event = await this.stripeService.constructEvent(stripeSignature,rawPayload);

      
    // } catch (error) {
    //   console.error('Error handling webhook event:', error);
    //   throw error;
    // }
   //let event: Stripe.Event;

    try {
      // console.log('Parsed Body:', req.body); // Parsed JSON object
      // console.log('Raw Body:', req.rawBody);
      // console.log('parsebody:', JSON.parse(req.body));
      //const payload = req.rawBody
      const rawBody = request.body; // Get the raw body data
    // const jsonData = JSON.parse(rawBody.toString());
    // console.log('jsonData',jsonData)
   // console.log('jsonData d',rawBody.toString())
  //  const jsonPayload = rawBody instanceof Uint8Array
  //               ? JSON.parse(new TextDecoder('utf8').decode(rawBody))
  //               : JSON.parse(rawBody);
  const payloadString = JSON.stringify(rawBody, null, 2);
  const secret = process.env.stripesecret;
  const header = await this.client.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret,
  });
  
       const event = await this.client.webhooks.constructEvent(
        payloadString,
        header,
        process.env.stripesecret
      
      );
      const updatewebhookstatus = await this.stripeService.onPaymentIntentCompleted(event);
      console.log(event.type);
      console.log(event.data.object)
      console.log(event.data.object)
      console.log('Success ramya:', event.id);

      // Cast event data to Stripe object
      if (event.type === 'payment_intent.succeeded') {
        const stripeObject: Stripe.PaymentIntent = event.data
          .object as Stripe.PaymentIntent;
        console.log(`ramya PaymentIntent status: ${stripeObject.status}`);
        // const customerId:any = stripeObject.customer;
        // const amount = stripeObject.amount;
        // const description = 'Invoice for your order '; // Replace with your invoice description

        // // Create an invoice using the extracted details
        // const { invoice, invoiceItem } = await this.stripeService.createInvoice(
        //   customerId,
        //   amount,
        //   description
        // );

      } else if (event.type === 'charge.succeeded') {
        const charge = event.data.object as Stripe.Charge;
        console.log(`ramya Charge id: ${charge.id}`);
      } else {
        console.warn(`ramya Unhandled event type: ${event.type}`);
      }
  
      // Return a response to acknowledge receipt of the event
      return ({received: true});
    } catch (err) {
      // On error, log and return the error message
      //console.log(`❌ Error message: ${err.message}`);
      //res.status(400).send(`Webhook Error: ${err.message}`);
      throw err;
    }

    // Successfully constructed event
   
  }

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard('firebase-jwt'))
  @Get('getInvoiceFromPaymentIntent/:invoiceid')
  async getInvoiceFromPaymentIntent(@Param('invoiceid') invoiceid: string): Promise<any> {
    const invoice = await this.stripeService.getInvoiceFromPaymentIntent(invoiceid);
    if (invoice) {
      return {
        success: true,
        invoice,
      };
    } else {
      return {
        success: false,
        message: 'Invoice not found',
      };
    }
  }

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard('firebase-jwt'))
  @Get('getRefundedReceiptsFromPaymentIntent/:PaymentIntentId')
  @ApiParam({
    name:'PaymentIntentId',
    type:String,
    required:true
})
  async getRefundedReceiptsFromPaymentIntent(@Param('PaymentIntentId') PaymentIntentId: string): Promise<any> {
    const invoice = await this.stripeService.getRefundedReceiptsFromPaymentIntent(PaymentIntentId);
    if (invoice) {
      return {
        success: true,
        invoice,
      };
    } else {
      return {
        success: false,
        message: 'Invoice not found',
      };
    }
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
  @Post('createCustomer/:email')
  async createCustomer(@Param('email') email: string): Promise<any> {
    const invoice = await this.stripeService.createCustomer(email);
    if (invoice) {
      return {
        success: true,
        invoice,
      };
    } else {
      return {
        success: false,
        message: 'Invoice not found',
      };
    }
  }

  @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('superAdmin'))
@Get('getRevenue/:fromDate/:toDate')
@ApiParam({
type:Date,
name:'fromDate',
required:true
})
@ApiParam({
    type:Date,
    name:'toDate',
    required:true
})
async getRevenue(@Param('fromDate') fromDate:Date,@Param('toDate') toDate:Date){
    try{
        return await this.stripeService.getRevenue(fromDate,toDate)
    }
    catch(e){
        throw e;
    }
}
  }

