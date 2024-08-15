import { Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiParam, ApiConsumes, ApiTags } from '@nestjs/swagger';
import sharp from 'sharp';
import { imageFileFilter } from 'src/file-helper';
import { uploadFile } from 'src/productimages/productimages.controller';
import { AdminDashboardService } from './admin-dashboard.service';

@ApiTags('admin-dashboard')
@Controller('admin-dashboard')
export class AdminDashboardController {
    constructor(private dashboardService:AdminDashboardService,
    //     @Inject(forwardRef(() => AuthService))
    // private authService: AuthService,
    ){}

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getOrderCountbasedOnStatus/:fromDate/:toDate/:status')
@ApiParam({type:Date,name:'fromDate',required:true})
@ApiParam({type:Date,name:'toDate',required:true})
@ApiParam({type:String,name:'status',required:true})
async getOrderCount(@Param('fromDate') fromDate:Date, @Param('toDate') toDate:Date, @Param('status')status:String){
try{
    return await this.dashboardService.getOrderCount(fromDate, toDate, status)
}
catch(e){
    throw e;
}
}




@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getTotalOrderCount/:fromDate/:toDate')
@ApiParam({type:Date,name:'fromDate',required:true})
@ApiParam({type:Date,name:'toDate',required:true})
async getTotalOrderCount(@Param('fromDate') fromDate:Date, @Param('toDate') toDate:Date){
try{
    return await this.dashboardService.getTotalOrderCount(fromDate, toDate)
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
@Get('topLessStock/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async topLessStock(@Param('pageno')pageno:Number){
try{
    return await this.dashboardService.topLessStock(pageno)
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
@Get('topSellingStock/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async topSellingStock(@Param('pageno')pageno:Number){
try{
    return await this.dashboardService.topSellingStock(pageno)
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getAllReturnReq/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getAllReturnReq(@Param('pageno')pageno:Number){
try{
    return await this.dashboardService.getAllReturnReq(pageno)
}
catch(e){
    throw e;
}
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getAllReturnReqbyProductIdPendingStatus/:pageno/:productId')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
@ApiParam({
    type:Number,
    name:'productId',
    required:true
})
async getAllReturnReqbyProductIdPendingStatus(@Param('pageno')pageno:Number, @Param('productId')productId:Number){
try{
    return await this.dashboardService.getAllReturnReqbyProductIdPendingStatus(pageno, productId)
}
catch(e){
    throw e;
}

}


@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getAllReturnReqbyProductId/:pageno/:productId')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
@ApiParam({
    type:Number,
    name:'productId',
    required:true
})
async getAllReturnReqbyProductId(@Param('pageno')pageno:Number, @Param('productId')productId:Number){
try{
    return await this.dashboardService.getAllReturnReqbyProductId(pageno, productId)
}
catch(e){
    throw e;
}
}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getAllReturnReqCompletedStatus/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getAllReturnReqCompletedStatus(@Param('pageno')pageno:Number){
try{
    return await this.dashboardService.getAllReturnReqCompletedStatus(pageno)
}
catch(e){
    throw e;
}

}
// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getAllReturnReqPendingStatus/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getAllReturnReqPendingStatus(@Param('pageno')pageno:Number){
try{
    return await this.dashboardService.getAllReturnReqPendingStatus(pageno)
}
catch(e){
    throw e;
}

}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-deliveryadmin'))
@Get('getOrderWaitingforDelivery/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getOrderWaitingforDelivery(@Param('pageno')pageno:Number){
try{
    return await this.dashboardService.getOrderWaitingforDelivery(pageno)
}
catch(e){
    throw e;
}
}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-deliveryadmin'))
@Put('assignDeliveryPersonnel/:orderId/:dpId')
@ApiParam({type:Number, name:'orderId', required:true})
@ApiParam({type:Number, name:'dpId', required:true})
async assignDeliveryPersonnel(@Param('orderId') orderId:number,@Param('dpId') dpId:number){
    try{
        return await this.dashboardService.assignDeliveryPersonnel(orderId,dpId)
    }
    catch(e){
        throw e;
    }
}

}
