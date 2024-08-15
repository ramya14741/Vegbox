import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CoupounService } from '../coupoun/coupoun.service';
import { ProductService } from '../product/product.service';
import { DirectBuy } from './directbuy.entity';

@Injectable()
export class DirectbuyService {
    constructor(@Inject('DIRECTBUY_REPOSITORY')
    private directBuyRepository:typeof DirectBuy,
    private productService: ProductService,
    private couponService:CoupounService)
    {}

    async addDirectBuyProduct(directbuyProduct):Promise<DirectBuy>{
        try{
             const cartTotal = await this.getTotalCartPrice(directbuyProduct.cartJson);
             directbuyProduct.cartTotal = cartTotal;
            return await this.directBuyRepository.create(directbuyProduct);
        }
        catch(e){
            throw e;
        }

    }

    async directBuyCart(directBuy, directBuyId):Promise<DirectBuy>{
        let res;
        
        try{
            const cartTotal = await this.getTotalCartPrice(directBuy.cartJson);
            directBuy.cartTotal = cartTotal;
            await this.directBuyRepository.update({
                cartJson:directBuy.cartJson,
                cartTotal:directBuy.cartTotal,
                cartTotalAfterDiscount:directBuy.cartTotalAfterDiscount,
                userid:directBuy.userid
            },{where:{
                directBuyId:directBuyId
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

    async getTotalCartPrice(cart){
        let totalPrice = 0;
        

        for (const c of cart) {
            const productpriceJson = {
                productId: c.productId,
                quantitycode: c.quantitytypecode,
                unitchoosenbyUser: c.unitchoosenbyUser
            };
    
            const productPrice:any = await this.productService.calculateEachProductPrice(productpriceJson);
    
            totalPrice += productPrice.price_basedon_unitchoosen;
        }
    
        return totalPrice;
}

async deletedirectBuyId(idDirectBuy):Promise<any>{
    try{
       const res =  await this.directBuyRepository.update({
        active:'N'
        },{
            where:{
                directBuyId:idDirectBuy
            }
        })

        return res;
    }
    catch(e){
        throw e;
    }
}

async updatePaidStatusandDeleteDirectBuy(directBuyId):Promise<any>{
    try{
       const res =  await this.directBuyRepository.update({
        active:'N',
        paidStatus:'Y'
        },{
            where:{
                directBuyId:directBuyId
            }
        })

        return res;
    }
    catch(e){
        throw e;
    }
}

async applydiscounttoDirectBuyProduct(idDirectBuy, idCoupon):Promise<any>{
    try{
        const getDirectBuyProduct = await this.getdirectbuybyId(idDirectBuy);
        const getCoupon = await this.couponService.getCouponbyId(idCoupon)
        const cartTotal = getDirectBuyProduct[0].getDataValue('cartTotal');
        const discount = getCoupon.getDataValue('discount');
        const cartTotalAfterDiscount = (cartTotal - (cartTotal * discount)/100).toFixed(2);
       const res =  await this.directBuyRepository.update({
       // cartTotal:cartTotalAfterDiscount,
        cartTotalAfterDiscount:cartTotalAfterDiscount,
        discountApplied:'Y'
        },{
            where:{
                directBuyId:idDirectBuy
            }
        })

        return cartTotalAfterDiscount;
    }
    catch(e){
        throw e;
    }
}

async getdirectbuybyId(id):Promise<DirectBuy[]>{
    try{
        let res;
        await this.directBuyRepository.findAll({
            where:{
               [Op.and]:{directBuyId:id, active:'Y'} 
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

async getDirectBuybyuserId(userId):Promise<DirectBuy[]>{
    try{
        let res;
        await this.directBuyRepository.findAll({
            where:{
               [Op.and]:{userid:userId, active:'Y'} 
            }
        })
        //.map(el=>el.get({plain:true}))
        .then(results=>{
            res= results;
        })
        
        return res;
    }
    catch(e){
        throw e;
    }
}
}

