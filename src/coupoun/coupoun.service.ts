import { Inject, Injectable } from '@nestjs/common';
import { Coupon } from './coupon.entity';
import { couponDto } from './coupon.dto';
import { Op } from 'sequelize';

@Injectable()
export class CoupounService {
    constructor(@Inject('COUPON_REPOSITORY')
    private couponRepository:typeof Coupon){}
    async getCoupon(idcoupon):Promise<Coupon[]>{
        try{
            let res;
            await this.couponRepository.findAll({
                where:{
                   [Op.and]:{couponid:idcoupon, active:'Y'} 
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

    async getCouponbyId(id):Promise<Coupon>{
        try{
            let res;
            await this.couponRepository.findAll({
                where:{
                    [Op.and]:{couponid:id, active:'Y'} 
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

async addCoupon(Coupon):Promise<Coupon>{
    let res;
    try{
        return await this.couponRepository.create(Coupon)
    }
    catch(e){
        throw e;
    }
}
async updateCoupon(Coupon:couponDto,couponid:number):Promise<Coupon>{
    let res;
    try{
        await this.couponRepository.update(
               {name:Coupon.name,
                expiry:Coupon.expiry,
                discount:Coupon.discount,
                active:Coupon.active
                },
            {where:{
                couponid:couponid
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

async deleteCouponbyId(couponid:number):Promise<any>{
    let res;
    try{
        const res =  await this.couponRepository.update({
         active:'N'
         },{
             where:{
                couponid:couponid
             }
         })

         return res;
     }
     catch(e){
         throw e;
     }
}

async getAllCoupon():Promise<Coupon[]>{
    try{
        let res;
    await this.couponRepository.findAll(
           { where:{
               [Op.and]:{active:'Y'} 
            }}
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
}