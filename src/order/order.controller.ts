import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { cashorderDto, orderDto } from './order.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService){}
    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getOrderbyUser/:userId')
    @ApiParam({
        name:'userId',
        type:String,
        required:true
    })
    async getOrderbyUser(@Param('userId') userId:string){
    try{
        return await this.orderService.getOrderbyUser(userId);
    }
    catch(e){
        throw e;
    }
    }
    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
    @Get('getAllOrder')
    async getAllOrder(){
    try{
        return await this.orderService.getAllOrder();
    }
    catch(e){
        throw e;
    }
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
@Get('getOrdersBasedonDate/:fromDate/:toDate')
@ApiParam({type:Date,name:'fromDate',required:true})
@ApiParam({type:Date,name:'toDate',required:true})
async getOrdersBasedonDate(@Param('fromDate')fromDate:Date,@Param('toDate')toDate:Date){
    try{
        return await this.orderService.getOrdersBasedonDate(fromDate,toDate)
    }
    catch(e){
        throw e;
    }
}


    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('addOrder')
    @ApiBody({type:orderDto, required:true})
    async addOrder(@Body() order){
        try{
            return await this.orderService.addOrder(order);
        }
        catch(e){
            throw e;
        }
    }
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('createcashOrder')
    @ApiBody({type:cashorderDto, required:true})
    async createcashOrder(@Body() order){
        try{
            return await this.orderService.createcashOrder(order);
        }
        catch(e){
            throw e;
        }
    }
   
    //any one can update.
    @Put('updateorderStatus/:idOrder/:orderstatus')
    @ApiParam({type:String, name:'idOrder',required:true})
    @ApiParam({type:String, name:'orderstatus',required:true})
    async updateorderStatus(@Param('idOrder') idOrder:number,@Param('orderstatus') orderstatus:string,){
        try{
            return await this.orderService.updateorderStatus(idOrder,orderstatus)
        }
        catch(e){
            throw e;
        }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getOrderbyOrderId/:orderId')
    @ApiParam({
        name:'orderId',
        type:Number,
        required:true
    })
    async getOrderbyOrderId(@Param('orderId') orderId:number){
    try{
        return await this.orderService.getOrderbyOrderId(orderId);
    }
    catch(e){
        throw e;
    }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
@Put('updateProductDatainOrder/:idOrder')
@ApiBody({ type: [Object], required: true })
@ApiParam({type:Number, name:'idOrder',required:true})
async updateProductDatainOrder(@Body() Body:any[],@Param('idOrder') idOrder:number){
    try{
        return await this.orderService.updateProductDatainOrder(Body,idOrder)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Post('cancelAllOrder/:idOrder')
@ApiParam({type:Number, name:'idOrder',required:true})
async cancelAllOrder(@Param('idOrder') idOrder:number){
    try{
        return await this.orderService.cancelAllOrder(idOrder);
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Post('cancelsingleProductOrder')
@ApiParam({type:Number, name:'idOrder',required:true})
@ApiBody({ type: [Object],required: true })
async cancelsingleProductOrder(@Param('idOrder') idOrder:number,@Body() productData:any[]){
    try{
        return await this.orderService.cancelsingleProductOrder(idOrder,productData);
    }
    catch(e){
        throw e;
    }
}

// @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getOrderhistorybyOrderId/:orderId')
    @ApiParam({
        name:'orderId',
        type:Number,
        required:true
    })
    async getOrderhistorybyOrderId(@Param('orderId') orderId:number){
    try{
        return await this.orderService.getOrderhistorybyOrderId(orderId);
    }
    catch(e){
        throw e;
    }
    }

}
