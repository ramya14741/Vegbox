import { Inject, Injectable } from '@nestjs/common';
import { Rating } from './rating.entity';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { databaseConfig } from '../database/database.providers';

@Injectable()
export class RatingService {
    constructor(@Inject('RATING_REPOSITORY')
    private ratingRepository:typeof Rating)
    {}
    async addRating(rating):Promise<any>{
        try{
            const ifRatingExist = await this.getratingbyUserIdandProductId(rating.postedBy,rating.productId)
            if(ifRatingExist)
            {
                this.updateRating(rating,ifRatingExist[0].rateId);
            }
            else{
                await this.ratingRepository.create(rating);
            }
            return "added the rating"
        }
        catch(e){
            throw e;
        }

    }

    async getratingbyUserIdandProductId(userId, ProductId):Promise<Rating[]>{
        try{
            let res;
            await this.ratingRepository.findAll({
                where:{
                    [Op.and]:[{postedBy:userId},{productId:ProductId}]
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

    async updateRating(ratingData, idRating){
        try{
           
            const rating = ratingData.rating
            const postedBy =ratingData.postedBy
            const productId = ratingData.productId
            const sequelize = new Sequelize(databaseConfig);
                const sqlQuery = ` UPDATE vegbox.rating r
                SET r.rating = :rating
                WHERE r.postedBy =:postedBy
                AND r.productId = :productId
                and r.rateId=:idRating`
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: { rating: rating,postedBy:postedBy, productId:productId,idRating:idRating},
                        type:QueryTypes.UPDATE
                    }
                );
                sequelize.close();
                return results;
        }
        catch(e){
            throw e;
        }
    }

    async deleteRatingbyId(idRating):Promise<any>{
        let res;
        try{
            return await this.ratingRepository.destroy({
                where:{
                    rateId:idRating
                }
                //paranoid:true
            })
        }
        catch(e){
            throw e;
        }
    }


    async getAllRatingbyProductId(ProductId):Promise<Rating[]>{
        try{
            let res;
            await this.ratingRepository.findAll({
                where:{
                    productId:ProductId
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
}
