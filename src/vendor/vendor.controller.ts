import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { couponDto } from 'src/coupoun/coupon.dto';
import { VendorService } from './vendor.service';
import { vendorDto } from './vendor.dto';

@ApiTags('vendor')
@Controller('vendor')
export class VendorController {
    constructor(private vendorService:VendorService){}

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getVendor/:vendorId')
@ApiParam({
    name:'vendorId',
    type:Number,
    required:true
})
async getVendor(@Param('vendorId') vendorId:Number){
try{
    return await this.vendorService.getVendor(vendorId);
}
catch(e){
    throw e;
}
}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getvendorbyId/:id')
@ApiParam({
    name:'id',
    type:Number,
    required:true
})
async getvendorbyId(@Param('id') id:Number){
try{
    return await this.vendorService.getvendorbyId(id);
}
catch(e){
    throw e;
}
}
// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Post('addVendor')
@ApiBody({type:vendorDto, required:true})
async addVendor(@Body() vendor){
    try{
        return await this.vendorService.addVendor(vendor);
    }
    catch(e){
        throw e;
    }
}
// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Put('updateVendor/:vendorId')
@ApiParam({type:Number, name:'vendorId', required:true})
@ApiBody({type:vendorDto,required:true})
async updateVendor(@Body() vendor,@Param('vendorId') vendorId:number){
    try{
        return await this.vendorService.updateVendor(vendor, vendorId)
    }
    catch(e)
    {
        throw e;
    }
}
// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Delete('deleteVendorbyId/:vendorId')
@ApiParam({type:Number, name:'vendorId', required:true})
async deleteVendorbyId(@Param('vendorId') vendorId:number){
    try{
        return await this.vendorService.deleteVendorbyId(vendorId)
    }
    catch(e){
        throw e;
    }
}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Get('getAllVendor')
async getAllVendor(){
try{
    return await this.vendorService.getAllVendor();
}
catch(e){
    throw e;
}
}
}



