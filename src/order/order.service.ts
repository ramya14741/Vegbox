import { Inject, Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { StockService } from '../stock/stock.service';
import { CartService } from '../cart/cart.service';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { databaseConfig } from '../database/database.providers';
import { DirectbuyService } from '../directbuy/directbuy.service';
const uniqueid = require("uniqueid");

@Injectable()
export class OrderService {
    constructor(@Inject('ORDER_REPOSITORY')
    private orderRepository:typeof Order,
    private stockService:StockService,
    private cartService:CartService,
    private directBuyService: DirectbuyService){}
    async getOrderbyUser(id):Promise<any>{
        try{
            const sequelize = new Sequelize(databaseConfig);
                const sqlQuery = `SELECT
                o.orderId,
                o.productData,
                o.userId,
                o.paymentIntentClientSecret,
                o.cartId,
                o.paymentIntent,
                o.webhookpaidStatus,
                o.orderStatus,
                o.invoiceId,
                o.deliveryPersonnelId,
                (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idshippingAddress) AS shippingAddress,
                (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idbillingAddress) AS billingAddress,
                o.createdAt,
                o.updatedAt
            FROM
                vegbox.order o
            WHERE
                o.userId = :id;`
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: { id: id },
                        type: QueryTypes.SELECT
                    }
                );
                sequelize.close();
                return results;
        }
        catch(e){
            throw e;
        }
    }
    async getAllOrder():Promise<any>{
        try{
            const sequelize = new Sequelize(databaseConfig);
                const sqlQuery = `SELECT
                o.orderId,
                o.productData,
                o.userId,
                o.paymentIntentClientSecret,
                o.cartId,
                o.paymentIntent,
                o.webhookpaidStatus,
                o.orderStatus,
                o.invoiceId,
                o.deliveryPersonnelId,
                (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idshippingAddress) AS shippingAddress,
                (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idbillingAddress) AS billingAddress,
                o.createdAt,
                o.updatedAt
            FROM
                vegbox.order o;`
                let results = await sequelize.query(sqlQuery,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                sequelize.close();
                return results;
        }
        catch(e){
            throw e;
        }
    }
async addOrder(order):Promise<Order>{
    let res;
    try{
       
            for (const c of order.productData) {
                const productpriceJson = {
                    productId: c.productId,
                    quantitycode: c.quantitytypecode,
                    quantityuserchoosen: c.unitchoosenbyUser
                };
        
                const updateStock = await this.stockService.updateStockQuantity(productpriceJson);
        
            }
        
      
    
        return await this.orderRepository.create(order)
    }
    catch(e){
        throw e;
    }
}

async createcashOrder(order):Promise<Order>{
    let res;
    const cart = order.directBuyId == 0 ? await this.cartService.getCartbyId(order.cartId): await this.directBuyService.getdirectbuybyId(order.directBuyId);
    try{
       
            for (const c of order.productData) {
                const productpriceJson = {
                    productId: c.productId,
                    quantitycode: c.quantitytypecode,
                    quantityuserchoosen: c.unitchoosenbyUser
                };
        
                const updateStock = await this.stockService.updateStockQuantity(productpriceJson);
        
            }
        
            let newOrder = {
                userId:order.userId,
                productData: order.productData,
                paymentIntent: {
                  id: uniqueid(),
                  amount: cart[0].getDataValue('discounApplied') == 'N' ? cart[0].getDataValue('cartTotal'):cart[0].getDataValue('cartTotalAfterDiscount'),
                  currency: "INR",
                  status: "Cash On Delivery",
                  created: Date.now(),
                  payment_method_types: ["cash"],
                },
                orderStatus:"cash on delivery"
            }
    
        return await this.orderRepository.create(newOrder)
    }
    catch(e){
        throw e;
    }
}

async updateorderStatus(orderId,orderStatus):Promise<Order>{
    let res;
    try{
        await this.orderRepository.update(
               {orderStatus:orderStatus
                },
            {where:{
                orderId:orderId
            },returning:true
        }).then(results=>{
            res = results;
        })
        return res;
        }
    catch(e){
        throw e;
    }
}

async updatePaymentIntent(orderId,paymentIntent, invoiceId):Promise<Order>{
    let res;
    try{
        await this.orderRepository.update(
               {paymentIntent:paymentIntent,
                paymentIntentClientSecret:paymentIntent.client_secret,
                invoiceId:invoiceId
                },
            {where:{
                orderId:orderId
            },returning:true
        }).then(results=>{
            res = results;
        })
        return res;
        }
    catch(e){
        throw e;
    }
}

async updateOrderPaidStatus(paymentIntentClientSecret,status):Promise<Order>{
    let res;
    try{
        await this.orderRepository.update(
               {webhookpaidStatus:status
                },
            {where:{
                paymentIntentClientSecret:paymentIntentClientSecret
            },returning:true
        }).then(results=>{
            res = results;
        })
        return res;
        }
    catch(e){
        throw e;
    }
}

async getOrderCount(fromDate,toDate,status){
    let res;
    try{
        await this.orderRepository.count({
            where:{
               createdAt:{
                [Op.between]:[fromDate,toDate]
               } ,
                orderStatus:status
            }
        })
        .then(results=>{
            res = results;
        })
        return res;
    }
    catch(e){
        throw e;
    }
    
}

async getTotalOrderCount(fromDate,toDate){
    let res;
    try{
        await this.orderRepository.count({
            where:{
               createdAt:{
                [Op.between]:[fromDate,toDate],
               }
            }
        })
        .then(results=>{
            res = results;
        })
        return res;
    }
    catch(e){
        throw e;
    }
    
}

async getOrdersBasedonDate(fromDate, toDate) {
    try {
       
        const sequelize = new Sequelize(databaseConfig);
        const sqlQuery = `SELECT
        o.orderId,
        o.productData,
        o.userId,
        o.paymentIntentClientSecret,
        o.cartId,
        o.paymentIntent,
        o.webhookpaidStatus,
        o.orderStatus,
        o.invoiceId,
        o.deliveryPersonnelId,
        (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idshippingAddress) AS shippingAddress,
        (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idbillingAddress) AS billingAddress,
        o.createdAt,
        o.updatedAt
    FROM
        vegbox.order o
            WHERE createdAt BETWEEN :fromDate AND :toDate
            ;`
        let results = await sequelize.query(sqlQuery,
            {
                replacements: { fromDate: fromDate, toDate: toDate },
                type: QueryTypes.SELECT
            }
        );
        sequelize.close();
        return results;
    }
    catch (e) {
        throw e;
    }
}
async getOrderbyOrderId(id): Promise<any> {
    try{
        const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT
            o.orderId,
            o.productData,
            o.userId,
            o.paymentIntentClientSecret,
            o.cartId,
            o.paymentIntent,
            o.webhookpaidStatus,
            o.orderStatus,
            o.invoiceId,
            o.deliveryPersonnelId,
            (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idshippingAddress) AS shippingAddress,
            (SELECT JSON_OBJECT('idAddress', idAddress, 'active', active, 'createdAt', createdAt, 'updatedAt', updatedAt, 'addressType', addressType, 'userid', userid, 'addressType', addressType, 'name', name, 'addressLine1', addressLine1, 'addressLine2', addressLine2, 'city', city, 'state', state, 'zip', zip, 'Customer_mobileNumber', Customer_mobileNumber, 'Customer_email', Customer_email, 'userid', userid) FROM Address WHERE idAddress = o.idbillingAddress) AS billingAddress,
            o.createdAt,
            o.updatedAt
        FROM
            vegbox.order o
        WHERE
            o.orderId = :id;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { id: id },
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
    }
    catch(e){
        throw e;
    }
}

async updateProductDatainOrder(orderData, idOrder):Promise<any>{
    let res;
    try{
        const sequelize = new Sequelize(databaseConfig);
        const orderDataString = JSON.stringify(orderData);
        const sqlQuery = `UPDATE vegbox.order o
        set productData = :orderDataString
        WHERE o.orderId =:idOrder
            ;`
        let results = await sequelize.query(sqlQuery,
            {
                replacements: { orderDataString: orderDataString, idOrder: idOrder },
                type: QueryTypes.UPDATE
            }
        );
        sequelize.close();
        return results;
    }
    catch (e) {
        throw e;
    }
}

async cancelAllOrder(idOrder):Promise<any>{
    
    try{
       
        const order = await this.getOrderbyOrderId(idOrder);
            for (const c of order[0].getDataValue('productData')) {
                const productpriceJson = {
                    productId: c.productId,
                    quantitycode: c.quantitytypecode,
                    quantityuserchoosen: c.unitchoosenbyUser
                };
        
                
        
            }
        return "cancelled all orders";
    }
    catch(e){
        throw e;
    }
}

async cancelsingleProductOrder(idOrder, productData):Promise<any>{
   
    try{
        for (const c of productData) {
            const productpriceJson = {
                productId: c.productId,
                quantitycode: c.quantitytypecode,
                quantityuserchoosen: c.unitchoosenbyUser
            };
    
            const updateStock = await this.stockService.releaseStockQuantity(idOrder,productpriceJson);
         
        }
 return "Cancelled the order";
    }
    catch(e){
        throw e;
    }
}

async getOrderhistorybyOrderId(id): Promise<any> {
    try{
        const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT new_status as status, change_date as statuschangedate FROM vegbox.order_history
            where order_id = :id
            order by change_date asc ;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { id: id },
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
    }
    catch(e){
        throw e;
    }
}

}

