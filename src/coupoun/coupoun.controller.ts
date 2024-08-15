import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CoupounService } from './coupoun.service';
import { AddressDto } from 'src/address/address.dto';
import { couponDto } from './coupon.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('coupoun')
@Controller('coupoun')
export class CoupounController {
    constructor(private coupounService:CoupounService){}

    @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getCoupon/:couponid')
@ApiParam({
    name:'couponid',
    type:Number,
    required:true
})
async getCoupon(@Param('couponid') couponid:Number){
try{
    return await this.coupounService.getCoupon(couponid);
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getCouponbyId/:id')
@ApiParam({
    name:'id',
    type:Number,
    required:true
})
async getCouponbyId(@Param('id') id:Number){
try{
    return await this.coupounService.getCouponbyId(id);
}
catch(e){
    throw e;
}
}
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Post('addCoupon')
@ApiBody({type:couponDto, required:true})
async addCoupon(@Body() coupon){
    try{
        return await this.coupounService.addCoupon(coupon);
    }
    catch(e){
        throw e;
    }
}
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Put('updateCoupon/:couponid')
@ApiParam({type:Number, name:'couponid', required:true})
@ApiBody({type:couponDto,required:true})
async updateCoupon(@Body() coupon,@Param('couponid') couponid:number){
    try{
        return await this.coupounService.updateCoupon(coupon, couponid)
    }
    catch(e)
    {
        throw e;
    }
}
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Delete('deleteCouponbyId/:couponid')
@ApiParam({type:Number, name:'couponid', required:true})
async deleteCouponbyId(@Param('couponid') couponid:number){
    try{
        return await this.coupounService.deleteCouponbyId(couponid)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getAllCoupon')
async getAllCoupon(){
try{
    return await this.coupounService.getAllCoupon();
}
catch(e){
    throw e;
}
}
}


