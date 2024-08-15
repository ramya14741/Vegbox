import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, QueryTypes, Op } from 'sequelize';
import { databaseConfig } from '../database/database.providers';
import { Stock } from './stock.entity';
import { stockDto } from './stock.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class StockService {

    constructor(@Inject('STOCK_REPOSITORY')
    private stockRepository: typeof Stock,
    private productService: ProductService) { }
    async getStocks(): Promise<Stock[]> {
        let res;
        try {
            await this.stockRepository.findAll(
                {
                    where: {
                        active: 'Y'
                    }
                }
            )
                //.then(el=>
                //el.get({plain:true}))
                .then(results => {
                    res = results;
                })
            return res;
        }
        catch (e) {
            throw e;
        }
    }

    async addStock(stock): Promise<Stock> {
        try {
            return await this.stockRepository.create(stock);
        }
        catch (e) {
            throw e;
        }

    }

    async updateStock(stock, idStock): Promise<Stock> {
        let res;
        try {
            await this.stockRepository.update({
                TotalQuantity: stock.TotalQuantity,
                PurchaseRate: stock.PurchaseRate,
                MRP: stock.MRP,
                sellRate: stock.sellRate,
                sellMarginPerc: stock.sellMarginPerc,
                DiscountPerc: stock.DiscountPerc,
                DiscountRate: stock.DiscountRate,
                soldQuantity: stock.soldQuantity,
                promotionId:stock.promotionId,
                vendorId:stock.vendorId
            }, {
                where: {
                    stockId: idStock
                }, returning: true
            }).then(results => {
                res = results;
            })
            return res;
        }
        catch (e) {
            throw e;
        }
    }


    async increaseStockbyStockId(quantity, idStock): Promise<Stock> {
        let res;
        const quantityValue = parseInt(quantity) || 0; 
        const stockquantity:any = await this.getStockbyId(idStock);
        const getProduct:any = await this.productService.getProductbyId(stockquantity[0].productId);
        const updatedQuantity = stockquantity[0].TotalQuantity + quantityValue;
        try {
            await this.stockRepository.update({
                TotalQuantity: updatedQuantity,
            }, {
                where: {
                    stockId: idStock
                }, returning: true
            }).then(results => {
                res = results;
            })

            if(getProduct[0].active =='N' && updatedQuantity>=0 ){
                await this.productService.activateProductbyId(stockquantity[0].productId);
            }
            return res;
        }
        catch (e) {
            throw e;
        }
    }

    async decreaseStockbyStockId(quantity, idStock): Promise<Stock> {
        let res;
        try {
            const quantityValue = parseInt(quantity) || 0; 
            const stockquantity:any = await this.getStockbyId(idStock);
            const reducedQuantity = stockquantity[0].TotalQuantity - quantityValue;
            await this.stockRepository.update({
                TotalQuantity: reducedQuantity,
            }, {
                where: {
                    stockId: idStock
                }, returning: true
            }).then(results => {
                res = results;
            })
            if(reducedQuantity<=0)
            {
                await this.productService.deleteProductbyId(stockquantity[0].productId);
            }
            return res;
        }
        catch (e) {
            throw e;
        }
    }



    async deleteStockbyId(idStock): Promise<any> {
        try {
            const res = await this.stockRepository.update({
                active: 'N'
            }, {
                where: {
                    stockId: idStock
                }
            })

            return res;
        }
        catch (e) {
            throw e;
        }
    }

    async getStockbyId(id) {
        try {
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT *
                FROM vegbox.stock s
                LEFT JOIN  vegbox.ratemaster rm
                on rm.productId = s.productId
               where s.stockId = :id
               AND s.active ='Y'`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { id: id },
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


    async getStockbyproductId(id) {
        try {
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT *
                FROM vegbox.stock s
                LEFT JOIN  vegbox.ratemaster rm
                on rm.productId = s.productId
               where s.productId = :id
               AND s.active ='Y'`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { id: id },
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

    async getAllStockbyPageNo(pageno) {
        try {

            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT *
                FROM vegbox.stock s
                WHERE s.active ='Y'
                LIMIT :LIMIT OFFSET :OFFSET`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { LIMIT: limit, OFFSET: offset },
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

    async getNewAddedStockbyPageNo(pageno) {
        try {

            let limit = 25
            let offset = 0 + (pageno - 1) * limit
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT * 
                FROM vegbox.stock s
                WHERE s.active ='Y'
                order by s.createdAt desc
                LIMIT :LIMIT OFFSET :OFFSET`
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { LIMIT: limit, OFFSET: offset },
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

    // async searchStock(pageno, text) {
    //     try {

    //         let limit = 25
    //         let offset = 0 + (pageno - 1) * limit
    //         const sequelize = new Sequelize(databaseConfig);
    //         const sqlQuery = `SELECT * 
    //             FROM vegbox.stock s
    //             WHERE s.productName like '%${text}%'
    //             and s.active ='Y'
    //             order by s.createdAt desc
    //             LIMIT :LIMIT OFFSET :OFFSET`
    //         let results = await sequelize.query(sqlQuery,
    //             {
    //                 replacements: { LIMIT: limit, OFFSET: offset,text:text},
    //                 type: QueryTypes.SELECT
    //             }
    //         );
    //         sequelize.close();
    //         return results;
    //     }
    //     catch (e) {
    //         throw e;
    //     }
    // }


    async updateStockQuantity(StockData) {
        try {
            //const sotckdetail:stockDto
             const sotckdetail:any = await this.getStockbyproductId(StockData.productId)
             if(sotckdetail.length>0){
             console.log(sotckdetail[0].soldQuantity);
            const quantity = Number(StockData.quantityuserchoosen.match(/(\d+(\.\d+)?)/)[0]);
            const quantitycode = StockData.quantitycode;
            
            const productId = StockData.productId;
         const soldQuantity = quantitycode == 2 ? sotckdetail[0].soldQuantity + quantity: sotckdetail[0].soldQuantity + ( quantity / 1000 )
         const reducePurchaseQuantity = quantitycode == 2 ? sotckdetail[0].TotalQuantity - quantity : sotckdetail[0].TotalQuantity - ( quantity / 1000 )
         const sequelize = new Sequelize(databaseConfig);
            const sqlQuery =`
            UPDATE stock s
            SET s.soldQuantity = :soldQuantity,
            s.TotalQuantity = :reducePurchaseQuantity,
            s.reserveQuantity=:reducePurchaseQuantity
            WHERE s.productId = :productId`

                
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { productId: productId, quantity: quantity,soldQuantity:soldQuantity,reducePurchaseQuantity:reducePurchaseQuantity },
      type: QueryTypes.UPDATE,
                }
            );
            sequelize.close();
            if(reducePurchaseQuantity<=0){
                await this.productService.deleteProductbyId(productId);
            }
            return results[0];
             }
             else return 200;
        }
        catch (e) {
            throw e;
        }
    }

    async releaseStockQuantity(idOrder,StockData) {
        try {
            //const sotckdetail:stockDto
             const sotckdetail:any = await this.getStockbyproductId(StockData.productId)
             if(sotckdetail.length>0){
             console.log(sotckdetail[0].soldQuantity);
            const quantity = Number(StockData.quantityuserchoosen.match(/(\d+(\.\d+)?)/)[0]);
            const quantitycode = StockData.quantitycode;
            
            const productId = StockData.productId;
            const getProductData:any = await this.productService.getProductbyId(productId);
         const soldQuantity = quantitycode == 2 ? sotckdetail[0].soldQuantity - quantity: sotckdetail[0].soldQuantity - ( quantity / 1000 )
         const increasePurchaseQuantity = quantitycode == 2 ? sotckdetail[0].TotalQuantity + quantity : sotckdetail[0].TotalQuantity + ( quantity / 1000 )
         const reduceReserveQuantity = quantitycode == 2 ? sotckdetail[0].reserveQuantity - quantity : sotckdetail[0].reserveQuantity - ( quantity / 1000 )
         const sequelize = new Sequelize(databaseConfig);
            const sqlQuery =`
            UPDATE stock s
            SET s.soldQuantity = :soldQuantity,
            s.TotalQuantity = :increasePurchaseQuantity,
            s.reserveQuantity=:reduceReserveQuantity
            WHERE s.productId = :productId`

                
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: { productId: productId, quantity: quantity,soldQuantity:soldQuantity,reduceReserveQuantity:reduceReserveQuantity,increasePurchaseQuantity:increasePurchaseQuantity},
      type: QueryTypes.UPDATE,
                }
            );
            sequelize.close();
            if(getProductData[0].active =='N' && increasePurchaseQuantity>=0 ){
                await this.productService.activateProductbyId(productId);
            }
            return results[0];
             }
             else return 200;
        }
        catch (e) {
            throw e;
        }
    }
    async getReservedStocks(): Promise<Stock[]> {
        let res;
        try {
            await this.stockRepository.findAll(
                {
                    where: {
                        active: 'Y',
                        reserveQuantity: {
                            [Op.gt]: 0 // Using [Op.gt] for greater than 0 comparison
                        }
                    }
                }
            )
                //.then(el=>
                //el.get({plain:true}))
                .then(results => {
                    res = results;
                })
            return res;
        }
        catch (e) {
            throw e;
        }
    }

}




