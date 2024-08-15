import { Inject, Injectable } from '@nestjs/common';
import { Op, Sequelize, QueryTypes } from 'sequelize';
import { databaseConfig } from '../database/database.providers';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
    constructor(@Inject('REVIEW_REPOSITORY')
    private reviewRepository:typeof Review)
    {}
    async addReview(review):Promise<any>{
        try{
            const ifReviewExist = await this.getreviewbyUserIdandProductId(review.postedBy,review.productId)
            if(ifReviewExist.length > 0)
            {
                 this.updateReview(review,ifReviewExist[0].reviewId);
            }
            else{
                 await this.reviewRepository.create(review);
            }
            return "review added"
        }
        catch(e){
            throw e;
        }

    }

    async getreviewbyUserIdandProductId(userId, ProductId):Promise<any>{
       
        try {
                
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT 
            r.reviewId,
            r.productId,
            r.reviewText,
            u.username,
            u.userid,
            MAX(CASE WHEN r.productId = rat.productId THEN rat.rating ELSE NULL END) AS rating,
            r.updatedAt
        FROM vegbox.review r
        LEFT JOIN vegbox.user u ON u.firebaseuserid = r.postedBy
        LEFT JOIN vegbox.rating rat ON rat.postedBy = r.postedBy
        WHERE r.productId = :ProductId 
        AND u.userid = :userId 
        GROUP BY
            r.reviewId,
            r.productId,
            r.reviewText,
            u.username,
            u.userid,
            r.updatedAt;
        `
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: {ProductId : ProductId, userId : userId},
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

    async updateReview(ratingData, idReview){
        try{

            const reviewText = ratingData.reviewText
            const postedBy =ratingData.postedBy
            const productId = ratingData.productId
           
            const sequelize = new Sequelize(databaseConfig);
                const sqlQuery = ` UPDATE vegbox.review r
                SET r.reviewText = :reviewText
                WHERE r.postedBy = :postedBy
                AND r.productId = :productId
                and r.reviewId =:idReview`
                let results = await sequelize.query(sqlQuery,
                    {
                        replacements: { reviewText: reviewText,postedBy:postedBy, productId:productId,idReview:idReview},
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


    async deleteReviewbyId(idReview):Promise<any>{
        let res;
        try{
            return await this.reviewRepository.destroy({
                where:{
                    reviewId:idReview
                }
                //paranoid:true
            })
        }
        catch(e){
            throw e;
        }
    }


    async getAllReviewbyProductId(ProductId){

        try {
                
            const sequelize = new Sequelize(databaseConfig);
            const sqlQuery = `SELECT 
            r.reviewId,
            r.productId,
            r.reviewText,
            u.username,
            u.userid,
            MAX(CASE WHEN r.productId = rat.productId THEN rat.rating ELSE NULL END) AS rating,
            r.updatedAt
        FROM vegbox.review r
        LEFT JOIN vegbox.user u ON u.firebaseuserid = r.postedBy
        LEFT JOIN vegbox.rating rat ON rat.postedBy = r.postedBy
        WHERE r.productId = :ProductId 
        GROUP BY
            r.reviewId,
            r.productId,
            r.reviewText,
            u.username,
            u.userid,
            r.updatedAt;
        `
            let results = await sequelize.query(sqlQuery,
                {
                    replacements: {ProductId : ProductId},
                    type: QueryTypes.SELECT
                }
            );
            sequelize.close();
            return results;
        }
        // try{
        //     let res;
        //     await this.reviewRepository.findAll({
        //         where:{
        //             productId:ProductId
        //         }
        //     })
        //     //.map(el=>el.get({plain:true}))
        //     .then(results=>{
        //         res= results;
        //     })
        //     if(res.length ==0){
        //         return null;
        //     }
        //     return res;
        // }
        catch(e){
            throw e;
        }
    }
}
