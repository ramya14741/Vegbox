import { Inject, Injectable } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { Sequelize, QueryTypes } from 'sequelize';
import { databaseConfig } from '../database/database.providers';
import { Order } from 'src/order/order.entity';

@Injectable()
export class AdminDashboardService {
    constructor(
        private orderService: OrderService,
        @Inject('ORDER_REPOSITORY')
    private orderRepository:typeof Order){}
      //  @Inject(forwardRef(() => CategoryService))) { }
      async getOrderCount(fromDate, toDate, status) {
        return await this.orderService.getOrderCount(fromDate, toDate, status);
    }
    async getTotalOrderCount(fromDate, toDate) {
        return await this.orderService.getTotalOrderCount(fromDate, toDate);
    }

    async topLessStock(pageno) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT p.productId, p.productName, s.TotalQuantity as unitsleft FROM vegbox.stock s
            join vegbox.product p
            on p.productId = s.productId WHERE TotalQuantity < 25
                        order by UnitsLeft asc
            LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset},
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }

    async topSellingStock(pageno) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT p.productId, p.productName, s.soldQuantity as unitsSold FROM vegbox.stock s
            join vegbox.product p
            on p.productId = s.productId 
                        order by s.soldQuantity desc
             LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset},
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }

    async getAllReturnReq(pageno) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `
            SELECT r.*, JSON_ARRAYAGG(
                JSON_OBJECT(
                    'returnReqItemId', rr.returnReqItemId,
                    'productId', rr.productId,
                    'quantitytypecode', rr.quantitytypecode,
                    'unitchoosenbyUser', rr.unitchoosenbyUser,
                    'status', rr.status 
                )
            ) AS returnReqItems
            FROM vegbox.return r
            JOIN vegbox.returnreqitem rr ON rr.returnId = r.returnId
            GROUP BY r.returnId
             LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset},
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }

    async getAllReturnReqbyProductIdPendingStatus(pageno, productId) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `
            SELECT r.returnId as returnId, r.orderId as orderId, r.userId as UserId, 
            r.status as ReturnOrderStatus, rr.returnReqItemId as returnReqId, rr.productId, rr.quantitytypecode as ProductTypeCode,
            rr.status as ReturnRequestProductStatus, rr.status as ReturnReqProductStatus, rr.unitchoosenbyUser as Quantity
                        FROM vegbox.return r
                        JOIN vegbox.returnreqitem rr ON rr.returnId = r.returnId
                        WHERE rr.productId =:productId
                        and rr.status ='pending'
                        GROUP BY r.returnId
             LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset,productId:productId },
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }


    async getAllReturnReqbyProductId(pageno, productId) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `
            SELECT r.returnId as returnId, r.orderId as orderId, r.userId as UserId, 
            r.status as ReturnOrderStatus, rr.returnReqItemId as returnReqId, rr.productId, rr.quantitytypecode as ProductTypeCode,
            rr.status as ReturnRequestProductStatus, rr.status as ReturnReqProductStatus, rr.unitchoosenbyUser as Quantity
                        FROM vegbox.return r
                        JOIN vegbox.returnreqitem rr ON rr.returnId = r.returnId
                        WHERE rr.productId =:productId
                        GROUP BY r.returnId
                        order by rr.createdAt Desc
             LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset,productId:productId },
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }


    async getAllReturnReqCompletedStatus(pageno) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `
            SELECT r.*, JSON_ARRAYAGG(
                JSON_OBJECT(
                    'returnReqItemId', rr.returnReqItemId,
                    'productId', rr.productId,
                    'quantitytypecode', rr.quantitytypecode,
                    'unitchoosenbyUser', rr.unitchoosenbyUser,
                    'status', rr.status 
                )
            ) AS returnReqItems
            FROM vegbox.return r
            JOIN vegbox.returnreqitem rr ON rr.returnId = r.returnId
            where rr.status = 'Completed'
            GROUP BY r.returnId
            ORDER BY rr.createdAt desc
             LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset},
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }

    async getAllReturnReqPendingStatus(pageno) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `
            SELECT r.*, JSON_ARRAYAGG(
                JSON_OBJECT(
                    'returnReqItemId', rr.returnReqItemId,
                    'productId', rr.productId,
                    'quantitytypecode', rr.quantitytypecode,
                    'unitchoosenbyUser', rr.unitchoosenbyUser,
                    'status', rr.status 
                )
            ) AS returnReqItems
            FROM vegbox.return r
            JOIN vegbox.returnreqitem rr ON rr.returnId = r.returnId
            where rr.status = 'pending'
            GROUP BY r.returnId
            ORDER BY rr.createdAt desc
             LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset},
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }

    async getOrderWaitingforDelivery(pageno) {
        try {
            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT * FROM vegbox.order o
            WHERE o.orderStatus ='Not processed'
             LIMIT :LIMIT OFFSET :OFFSET;`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements:{LIMIT:limit,OFFSET:offset},
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        catch (e) {
            throw e;
        }
    }



    async assignDeliveryPersonnel(orderId,dpId):Promise<Order>{
        let res;
        try{
            await this.orderRepository.update(
                   {deliveryPersonnelId:dpId
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

}
