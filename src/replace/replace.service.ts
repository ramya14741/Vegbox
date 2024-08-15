import { Inject, Injectable } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { Replace } from './replace.entity';
import { Sequelize, QueryTypes } from 'sequelize';
import { databaseConfig } from '../database/database.providers';

@Injectable()
export class ReplaceService {
    constructor(@Inject('REPLACE_REPOSITORY')
    private replacereqRepository:typeof Replace,
    private orderService: OrderService )
    {}
    async createReplaceRequest(req) {
       const productData=[];
      const replaceRequest = await this.replacereqRepository.create(req);
        
     
      const updateOrder = await this.orderService.updateorderStatus(req.orderId,'Replace Initiated');
      const getOrder = await this.orderService.getOrderbyOrderId(req.orderId);
      getOrder[0].getDataValue('productData').forEach(product => {
        if (req.productId === product.productId) {
          // Update the status in productData to 'Completed' for the matching productId
          product.status = 'Replace Initiated';
        }
        productData.push(product);
      });
     const updateProductDataOrder = await this.orderService.updateProductDatainOrder(productData,req.orderId);
      return replaceRequest
    }
    catch(e){
      throw e;
    }

    async updatereplaceStatus(replaceId,status,orderId):Promise<Replace>{
        let res;
        const productData=[];
        try{
            await this.replacereqRepository.update(
                   {status:status
                    },
                {where:{
                    replaceId:replaceId
                },returning:true
            }).then(results=>{
                res = results;
            })
            const replaceItems = await this.getreplaceforaOrder(orderId);
            const allCompleted = await this.areAllTasksCompleted(replaceItems);
            if(allCompleted)
            {
                const updateOrder = await this.orderService.updateorderStatus(orderId,'Replace Completed');
            }
            const orderData = await this.orderService.getOrderbyOrderId(orderId);
        orderData[0].getDataValue('productData').forEach(product => {
          const matchingReturn = replaceItems.find(returnData => returnData.productId === product.productId);
          if (matchingReturn) {
            // Update the status in productData to 'Completed' for the matching productId
            product.status = status;
          }
          productData.push(product);
        });
       const updateOrder = await this.orderService.updateProductDatainOrder(productData,orderId);
            return res;
            
            }
        catch(e){
            throw e;
        }
    }

    
    
    async areAllTasksCompleted(tasks: any[]): Promise<boolean> {
        return tasks.every(task => task.status === 'Replace Completed');
      }


      async getreplaceforaOrder(orderId){
        try{
           
            const sequelize = new Sequelize(databaseConfig);
                const sqlQuery = `SELECT * FROM vegbox.replace
                WHERE orderId =:orderId`
                let results:any = await sequelize.query(sqlQuery,
                    {
                      replacements: { orderId: orderId},
                        type:QueryTypes.SELECT
                    }
                );
                sequelize.close();
                // /console.log(results[0]);
              
               return results;
        }
        catch(e){
            throw e;
        }
    }

        }
  

