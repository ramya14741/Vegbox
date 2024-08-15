import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { cartDto } from './cart.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private cartService:CartService){}

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('addCart')
// @ApiParam({type:String, name:'categoryId',required:true})
// @ApiParam({type:String, name:'categoryName',required:true})
@ApiBody({type:cartDto,required:true})
async addCart(@Body() Cart){
    try{
        return await this.cartService.addCart(Cart)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('updateCart/:idCart')
@ApiBody({type:cartDto,required:true})
@ApiParam({type:String, name:'idCart',required:true})
async updateCart(@Body() cart,@Param('idCart') idCart:string){
    try{
        return await this.cartService.updateCart(cart,idCart)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('deleteCartbyId/:idCart')
@ApiParam({type:String, name:'idCart',required:true})
async deleteCartbyId(@Param('idCart') idCart:string){
    try {
        return await this.cartService.deleteCartbyId(idCart);
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('updatePaidStatusandDeleteCart/:idCart')
@ApiParam({type:String, name:'idCart',required:true})
async updatePaidStatusandDeleteCart(@Param('idCart') idCart:string){
    try {
        return await this.cartService.updatePaidStatusandDeleteCart(idCart);
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('applydiscounttoCart/:idCart/:idCoupon')
@ApiParam({type:Number, name:'idCart',required:true})
@ApiParam({type:Number, name:'idCoupon',required:true})
async applydiscounttoCart(@Param('idCart') idCart:number, @Param('idCoupon') idCoupon:number){
    try {
        return await this.cartService.applydiscounttoCart(idCart,idCoupon);
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Get('getCartbyId/:id')
@ApiParam({
    name:'id',
    type:Number,
    required:true
})
async getCartbyId(@Param('id') id:Number){
try{
    return await this.cartService.getCartbyId(id);
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Get('getCartbyuserId/:userid')
@ApiParam({
    name:'userid',
    type:String,
    required:true
})
async getCartbyuserId(@Param('userid') userid:string){
try{
    return await this.cartService.getCartbyuserId(userid);
}
catch(e){
    throw e;
}
}

}
