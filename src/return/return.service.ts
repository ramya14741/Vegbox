import { Inject, Injectable } from '@nestjs/common';
import { Return, ReturnReqItem } from './return.entity';
import { StripePaymentService } from '../stripe-payment/stripe-payment.service';
import { OrderService } from '../order/order.service';
import { Sequelize, QueryTypes, Op } from 'sequelize';
import { databaseConfig } from '../database/database.providers';

@Injectable()
export class ReturnService {
    constructor(@Inject('RETURN_REPOSITORY')
    private returnreqRepository:typeof Return,
    @Inject('RETURNREQITEM_REPOSITORY')
    private returnreqItemRepository:typeof ReturnReqItem,
    private stripeService: StripePaymentService,
    private orderService: OrderService )
    {}

    async createReturnRequest(req) {
      try{  let returnreq = {
        orderId: req.orderId,
        userId: req.userId,
        status: 'pending'
      };
      const productData =[];
    const returnRequest = await this.returnreqRepository.create(returnreq);
    const updateOrder = await this.orderService.updateorderStatus(req.orderId,'Return Initiated');
    const getOrder = await this.orderService.getOrderbyOrderId(req.orderId);
    const returnRequestItems = await req.items.map(async item => {
      const returnRequestItem = await this.returnreqItemRepository.create({
        returnId:returnRequest.getDataValue('returnId'),
        productId: item.productId,
        quantitytypecode: item.quantitytypecode,
        unitchoosenbyUser: item.unitchoosenbyUser,
        status: 'Return Initiated'
      });
      return returnRequestItem;
    });
   
   
    getOrder[0].getDataValue('productData').forEach(product => {
      const matchingReturn = req.items.find(returnData => returnData.productId === product.productId);
      if (matchingReturn) {
        // Update the status in productData to 'Completed' for the matching productId
        product.status = 'Return Initiated';
      }
      productData.push(product);
    });
   const updateProductDataOrder = await this.orderService.updateProductDatainOrder(productData,req.orderId);
    const paymentIntentId = getOrder[0].getDataValue('paymentIntent');
    const returnrefundReq = await this.stripeService.processRefund(paymentIntentId.id,req.items)
    return returnRequest
  }
  catch(e){
    throw e;
  }
      
      }

      async getrefundInformationforaOrder(orderId){
        try{
           
            const sequelize = new Sequelize(databaseConfig);
                const sqlQuery = `SELECT * FROM vegbox.order
                WHERE orderId =:orderId`
                let results:any = await sequelize.query(sqlQuery,
                    {
                      replacements: { orderId: orderId},
                        type:QueryTypes.SELECT
                    }
                );
                sequelize.close();
                // /console.log(results[0]);
                const refundedReceipts = await this.stripeService.getRefundedReceiptsFromPaymentIntent(results[0].paymentIntent.id)
               return refundedReceipts;
        }
        catch(e){
            throw e;
        }
    }


    async updateReturnReqItemComplete(idProduct, status, returnReqId, returnreqItemId):Promise<any>{
      let res;
      let  returnReq ;
      const productData=[];
      try{
          await this.returnreqItemRepository.update({
            status:status
          },{where:{
            [Op.and]:{productId:idProduct,returnreqItemId:returnreqItemId}
            },returning:true
        }).then(results=>{
            res = results;
        })
         returnReq = await this.getreturnreqItembyreturnId(returnReqId);
         const returnReqData = await this.getreturnreqbyreturnId(returnReqId)
        // const returnId = returnReq[0].returnId
        const returnReqItem = await this.getreturnreqItembyreturnItemId(returnreqItemId);
        const allCompleted = await this.areAllReturnTasksCompleted(returnReq);
        if(allCompleted)
        {
          const returnRequpdate = await this.updateReturnReqComplete(returnReqId,'Completed');
        
         
          const updateOrder = await this.orderService.updateorderStatus(returnReqData[0].getDataValue('orderId'),'Return Completed');
        }
        const orderData = await this.orderService.getOrderbyOrderId(returnReqData[0].getDataValue('orderId'));
        orderData[0].getDataValue('productData').forEach(product => {
          const matchingReturn = returnReqItem.find(returnData => returnData.productId === product.productId);
          if (matchingReturn) {
            // Update the status in productData to 'Completed' for the matching productId
            product.status = status;
          }
          productData.push(product);
        });
       const updateOrder = await this.orderService.updateProductDatainOrder(productData,returnReqData[0].getDataValue('orderId'));
        return res;
        }
    catch(e){
        throw e;
    }
  }

  async getreturnreqbyreturnId(id):Promise<ReturnReqItem[]>{
    try{
        let res;
        await this.returnreqRepository.findAll({
            where:{
              returnId:id
            }
        })
        //.map(el=>el.get({plain:true}))
        .then(results=>{
            res= results;
        })
        if(res.length ==0){
            return null;
        }
        return res;
    }
    catch(e){
        throw e;
    }
}

async getreturnreqItembyreturnId(id):Promise<ReturnReqItem[]>{
  try{
      let res;
      await this.returnreqItemRepository.findAll({
          where:{
            returnId:id
          }
      })
      //.map(el=>el.get({plain:true}))
      .then(results=>{
          res= results;
      })
      if(res.length ==0){
          return null;
      }
      return res;
  }
  catch(e){
      throw e;
  }
}


async getreturnreqItembyreturnItemId(id):Promise<ReturnReqItem[]>{
  try{
      let res;
      await this.returnreqItemRepository.findAll({
          where:{
            returnReqItemId:id
          }
      })
      //.map(el=>el.get({plain:true}))
      .then(results=>{
          res= results;
      })
      if(res.length ==0){
          return null;
      }
      return res;
  }
  catch(e){
      throw e;
  }
}

async getreturnreqbyId(id):Promise<Return[]>{
  try{
      let res;
      await this.returnreqRepository.findAll({
          where:{
            returnId:id
          }
      })
      //.map(el=>el.get({plain:true}))
      .then(results=>{
          res= results;
      })
      if(res.length ==0){
          return null;
      }
      return res;
  }
  catch(e){
      throw e;
  }
}

async areAllReturnTasksCompleted(tasks: any[]): Promise<boolean> {
  return tasks.every(task => task.getDataValue('status') === 'Return Completed');
}

async updateReturnReqComplete(returnReqId, status):Promise<any>{
  let res;
  try{
      await this.returnreqRepository.update({
        status:status
      },{where:{
        returnId:returnReqId
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
}
