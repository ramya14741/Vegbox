import { Inject, Injectable } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import { promotionDto } from './promotion.dto';
import { PromotionData } from './promotion.entity';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../database/database.providers';

@Injectable()
export class PromotionService {
    constructor(@Inject('PROMOTION_REPOSITORY')
    private promotionRepository:typeof PromotionData){}
    async getPromotion(promotionId):Promise<PromotionData[]>{
        try{
            let res;
            await this.promotionRepository.findAll({
                where:{
                   [Op.and]:{promotionId:promotionId, active:'Y'} 
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

    async getPromotionbyId(id):Promise<PromotionData>{
        try{
            let res;
            await this.promotionRepository.findAll({
                where:{
                    [Op.and]:{promotionId:id, active:'Y'} 
                }
            })
            //.map(el=>el.get({plain:true}))
            .then(results=>{
                res= results;
            })
            if(res.length ==0){
                return null;
            }
            return res[0];
        }
        catch(e){
            throw e;
        }
    }

async addPromotion(Promotion):Promise<PromotionData>{
    let res;
    try{
        return await this.promotionRepository.create(Promotion)
    }
    catch(e){
        throw e;
    }
}
async updatePromotion(Promotion:promotionDto,promotionId:number):Promise<PromotionData>{
    let res;
    try{
        await this.promotionRepository.update(
               {promotionName:Promotion.promotionName,
                expiry:Promotion.expiry,
                discount:Promotion.discount,
                active:Promotion.active,
                promotionDescription:Promotion.promotionDescription
                },
            {where:{
                promotionId:promotionId
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

async deletepromotionbyId(promotionId:number):Promise<any>{
    let res;
    try{
        const res =  await this.promotionRepository.update({
         active:'N'
         },{
             where:{
                promotionId:promotionId
             }
         })

         return res;
     }
     catch(e){
         throw e;
     }
}

async getAllPromotion():Promise<PromotionData[]>{
    try{
        let res;
    await this.promotionRepository.findAll(
            // where:{
            //    [Op.and]:{couponid:idcoupon, active:'Y'} 
            // }
        )
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

async getPromotionwithImage(promotionId) {
    try {
        
        const sequelize = new Sequelize(databaseConfig);
        const sqlQuery = `SELECT *
            FROM vegbox.promotiondata p
            LEFT JOIN vegbox.productimages pi
            on pi.promotionId = p.promotionId
            and pi.active ='Y'
            and p.expiry > now()
            WHERE p.promotionId = :promotionId  
            and p.active='Y'`
        let results = await sequelize.query(sqlQuery,
            {
                replacements: {promotionId:promotionId},
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

async getAllPromotionwithImages() {
    try {
        
        const sequelize = new Sequelize(databaseConfig);
        const sqlQuery = `SELECT *
        FROM vegbox.promotiondata p
        LEFT JOIN vegbox.productimages pi
            ON pi.promotionId = p.promotionId
        WHERE pi.active = 'Y'
            AND p.expiry > NOW()
            AND p.active = 'Y'`
        let results = await sequelize.query(sqlQuery,
            {
                replacements: {},
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
}