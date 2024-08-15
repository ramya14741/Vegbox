import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { wishListDto } from './wishlist.dto';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('wishlist')
@Controller('wishlist')
export class WishlistController {
    constructor(private wishlistService:WishlistService){}
    
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getwishListbyUser/:userId')
    @ApiParam({
        name:'userId',
        type:String,
        required:true
    })
    async getwishListbyUser(@Param('userId') userId:string){
    try{
        return await this.wishlistService.getwishListbyUser(userId);
    }
    catch(e){
        throw e;
    }
    }
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('User'))
    
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
    @Post('addwishlist')
    @ApiBody({type:wishListDto, required:true})
    async addwishlist(@Body() wishlist){
        try{
           const res =   await this.wishlistService.addwishlist(wishlist);
           return res;
        }
        catch(e){
            throw e;
        }
    }

    
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
    @Delete('deletewishlistbyUser/:userid/:wishid')
@ApiParam({type:String, name:'userid', required:true})
@ApiParam({type:Number, name:'wishid', required:true})
async deletewishlistbyUser(@Param('userid') userid:string,@Param('wishid') wishid:number){
    try{
        return await this.wishlistService.deletewishlistbyUser(userid,wishid)
    }
    catch(e){
        throw e;
    }
}
}
