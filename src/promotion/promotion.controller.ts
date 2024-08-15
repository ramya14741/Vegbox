import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { promotionDto } from './promotion.dto';
import { PromotionService } from './promotion.service';

@ApiTags('promotion')
@Controller('promotion')
export class PromotionController {
    constructor(private promotionService:PromotionService){}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getPromotion/:promotionId')
@ApiParam({
    name:'promotionId',
    type:Number,
    required:true
})
async getPromotion(@Param('promotionId') promotionId:Number){
try{
    return await this.promotionService.getPromotion(promotionId);
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getPromotionbyId/:promotionId')
@ApiParam({
    name:'promotionId',
    type:Number,
    required:true
})
async getPromotionbyId(@Param('promotionId') promotionId:Number){
try{
    return await this.promotionService.getPromotionbyId(promotionId);
}
catch(e){
    throw e;
}
}
// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Post('addPromotion')
@ApiBody({type:promotionDto, required:true})
async addPromotion(@Body() promotion){
    try{
        return await this.promotionService.addPromotion(promotion);
    }
    catch(e){
        throw e;
    }
}
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Put('updatePromotion/:promotionId')
@ApiParam({type:Number, name:'promotionId', required:true})
@ApiBody({type:promotionDto,required:true})
async updatePromotion(@Body() promotion,@Param('promotionId') promotionId:number){
    try{
        return await this.promotionService.updatePromotion(promotion, promotionId)
    }
    catch(e)
    {
        throw e;
    }
}
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Delete('deletepromotionbyId/:promotionId')
@ApiParam({type:Number, name:'promotionId', required:true})
async deletepromotionbyId(@Param('promotionId') promotionId:number){
    try{
        return await this.promotionService.deletepromotionbyId(promotionId)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getAllPromotion')
async getAllPromotion(){
try{
    return await this.promotionService.getAllPromotion();
}
catch(e){
    throw e;
}
}

@Get('getPromotionwithImage/:promotionId')
@ApiParam({
    name:'promotionId',
    type:Number,
    required:true
})
async getPromotionwithImage(@Param('promotionId') promotionId:Number){
try{
    return await this.promotionService.getPromotionwithImage(promotionId);
}
catch(e){
    throw e;
}
}

@Get('getAllPromotionwithImages')
async getAllPromotionwithImages(){
try{
    return await this.promotionService.getAllPromotionwithImages();
}
catch(e){
    throw e;
}
}
}


