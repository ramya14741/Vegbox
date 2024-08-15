import { Inject, Injectable } from '@nestjs/common';
import { Cart } from './cart.entity';
import { ProductService } from '../product/product.service';
import { Op } from 'sequelize';
import { CoupounService } from '../coupoun/coupoun.service';

@Injectable()
export class CartService {
    constructor(@Inject('CART_REPOSITORY')
    private cartRepository:typeof Cart,
    private productService: ProductService,
    private couponService:CoupounService)
    {}

    async addCart(cart):Promise<Cart>{
        try{
             const cartTotal = await this.getTotalCartPrice(cart.cartJson);
             cart.cartTotal = cartTotal;
            return await this.cartRepository.create(cart);
        }
        catch(e){
            throw e;
        }

    }

    async updateCart(cart, idCart):Promise<Cart>{
        let res;
        
        try{
            const cartTotal = await this.getTotalCartPrice(cart.cartJson);
            cart.cartTotal = cartTotal;
            await this.cartRepository.update({
                cartJson:cart.cartJson,
                cartTotal:cart.cartTotal,
                cartTotalAfterDiscount:cart.cartTotalAfterDiscount,
                userid:cart.userid
            },{where:{
                cartId:idCart
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

async deleteCartbyId(idCart):Promise<any>{
    try{
       const res =  await this.cartRepository.update({
        active:'N'
        },{
            where:{
                cartId:idCart
            }
        })

        return res;
    }
    catch(e){
        throw e;
    }
}

async updatePaidStatusandDeleteCart(idCart):Promise<any>{
    try{
       const res =  await this.cartRepository.update({
        active:'N',
        paidStatus:'Y'
        },{
            where:{
                cartId:idCart
            }
        })

        return res;
    }
    catch(e){
        throw e;
    }
}

async applydiscounttoCart(idCart, idCoupon):Promise<any>{
    try{
        const getCart = await this.getCartbyId(idCart);
        const getCoupon = await this.couponService.getCouponbyId(idCoupon)
        const cartTotal = getCart[0].getDataValue('cartTotal');
        const discount = getCoupon.getDataValue('discount');
        const cartTotalAfterDiscount = (cartTotal - (cartTotal * discount)/100).toFixed(2);
       const res =  await this.cartRepository.update({
       // cartTotal:cartTotalAfterDiscount,
        cartTotalAfterDiscount:cartTotalAfterDiscount,
        discountApplied:'Y'
        },{
            where:{
                cartId:idCart
            }
        })

        return cartTotalAfterDiscount;
    }
    catch(e){
        throw e;
    }
}

async getCartbyId(id):Promise<Cart[]>{
    try{
        let res;
        await this.cartRepository.findAll({
            where:{
               [Op.and]:{cartId:id, active:'Y'} 
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

async getCartbyuserId(userId):Promise<Cart[]>{
    try{
        let res;
        await this.cartRepository.findAll({
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
