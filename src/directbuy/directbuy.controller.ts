import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DirectbuyService } from './directbuy.service';
import { DirectBuy } from './directbuy.entity';
import { directBuyDto } from './directbuy.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('directbuy')
@Controller('directbuy')
export class DirectbuyController {
    constructor(private directBuyService:DirectbuyService){}

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('addDirectBuyProduct')
// @ApiParam({type:String, name:'categoryId',required:true})
// @ApiParam({type:String, name:'categoryName',required:true})
@ApiBody({type:directBuyDto,required:true})
async addDirectBuyProduct(@Body() directbuyProduct){
    try{
        return await this.directBuyService.addDirectBuyProduct(directbuyProduct)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('directBuyCart/:directBuyId')
@ApiBody({type:directBuyDto,required:true})
@ApiParam({type:String, name:'directBuyId',required:true})
async directBuyCart(@Body() directBuy,@Param('directBuyId') directBuyId:string){
    try{
        return await this.directBuyService.directBuyCart(directBuy,directBuyId)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('deletedirectBuyId/:directBuyId')
@ApiParam({type:String, name:'directBuyId',required:true})
async deletedirectBuyId(@Param('directBuyId') directBuyId:string){
    try {
        return await this.directBuyService.deletedirectBuyId(directBuyId);
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('updatePaidStatusandDeleteDirectBuy/:directBuyId')
@ApiParam({type:String, name:'directBuyId',required:true})
async updatePaidStatusandDeleteDirectBuy(@Param('directBuyId') directBuyId:string){
    try {
        return await this.directBuyService.updatePaidStatusandDeleteDirectBuy(directBuyId);
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Put('applydiscounttoDirectBuyProduct/:directBuyId/:idCoupon')
@ApiParam({type:Number, name:'directBuyId',required:true})
@ApiParam({type:Number, name:'idCoupon',required:true})
async applydiscounttoDirectBuyProduct(@Param('directBuyId') directBuyId:number, @Param('idCoupon') idCoupon:number){
    try {
        return await this.directBuyService.applydiscounttoDirectBuyProduct(directBuyId,idCoupon);
    }
    catch(e){
        throw e;
    }
}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt'))
@Get('getdirectbuybyId/:id')
@ApiParam({
    name:'id',
    type:Number,
    required:true
})
async getdirectbuybyId(@Param('id') id:Number){
try{
    return await this.directBuyService.getdirectbuybyId(id);
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Get('getDirectBuybyuserId/:userid')
@ApiParam({
    name:'userid',
    type:String,
    required:true
})
async getDirectBuybyuserId(@Param('userid') userid:string){
try{
    return await this.directBuyService.getDirectBuybyuserId(userid);
}
catch(e){
    throw e;
}
}

}

