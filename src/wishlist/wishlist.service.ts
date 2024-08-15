import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Wishlist } from './wishlist.entity';
import { Op } from 'sequelize';

@Injectable()
export class WishlistService {
    constructor(@Inject('WISHLIST_REPOSITORY')
    private wishlistRepository:typeof Wishlist,
   ){}
    async getwishListbyUser(id):Promise<Wishlist[]>{
        try{
            let res;
            await this.wishlistRepository.findAll({
                where:
                   {userId:id} 
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

    async addwishlist(wishlist) {
        try {
            const userWishlist:any = await this.getwishListbyUser(wishlist.userId);
    
            if (userWishlist.length < 10) {
                for (const item of userWishlist) {
                    if (item.productData.productId === wishlist.productData.productId) {
                        throw new HttpException("Product already added to wishlist", HttpStatus.BAD_REQUEST);
                    }
                }
                return await this.wishlistRepository.create(wishlist);
            } else {
                throw new HttpException("Cannot add more than 10 items to wishlist", HttpStatus.BAD_REQUEST);
            }
        } catch (e) {
            throw e;
        }
    }
    

async deletewishlistbyUser(userId:string,wishid:number):Promise<any>{
    let res;
    try{
        return await this.wishlistRepository.destroy(
            {
                where:{
                    [Op.and]:{userId:userId,wishid:wishid}
                }
            }
        )
    }
    catch(e){
        throw e;
    }
}
}
