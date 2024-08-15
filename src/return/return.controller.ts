import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReturnService } from './return.service';
import { AuthGuard } from '@nestjs/passport';
import { returnreqDto } from './return.dto';

@ApiTags('return')
@Controller('return')
export class ReturnController {
    constructor(private returnService:ReturnService){}
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('createReturnRequest')
    @ApiBody({type:returnreqDto,required:true})
  async createReturnRequest(
    @Body() returnreq
  ){
   try{
    return await this.returnService.createReturnRequest(returnreq);
   }
    catch(e){
        throw e;
    }
  }


  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
  @Get('getrefundInformationforaOrder/:orderId')
  @ApiParam({
      name:'orderId',
      type:Number,
      required:true
  })
  async getrefundInformationforaOrder(@Param('orderId') orderId:number){
  try{
      return await this.returnService.getrefundInformationforaOrder(orderId);
  }
  catch(e){
      throw e;
  }
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
  @Put('updateReturnReqItemComplete/:idProduct/:status/:returnId/:returnreqItemId')
  @ApiParam({type:Number, name:'idProduct',required:true})
  @ApiParam({type:Number, name:'returnId',required:true})
  @ApiParam({type:Number, name:'returnreqItemId',required:true})
  @ApiParam({type:String, name:'status',required:true})
  async updateReturnReqItemComplete(@Param('idProduct') idProduct:number,@Param('status') status:string, @Param('returnId') returnId:number,@Param('returnreqItemId') returnreqItemId:number){
      try{
          return await this.returnService.updateReturnReqItemComplete(idProduct,status, returnId, returnreqItemId)
      }
      catch(e){
          throw e;
      }
  }

  @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
  @Get('getreturnreqbyreturnId/:id')
  @ApiParam({
      name:'id',
      type:Number,
      required:true
  })
  async getreturnreqbyreturnId(@Param('id') id:Number){
  try{
      return await this.returnService.getreturnreqbyreturnId(id);
  }
  catch(e){
      throw e;
  }
  }

  //   @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt'))
@Get('getreturnreqItembyreturnItemId/:id')
@ApiParam({
    name:'id',
    type:Number,
    required:true
})
async getreturnreqItembyreturnItemId(@Param('id') id:Number){
try{
    return await this.returnService.getreturnreqItembyreturnItemId(id);
}
catch(e){
    throw e;
}
}

@Get('getreturnreqItembyreturnId/:id')
@ApiParam({
    name:'id',
    type:Number,
    required:true
})
async getreturnreqItembyreturnId(@Param('id') id:Number){
try{
    return await this.returnService.getreturnreqItembyreturnId(id);
}
catch(e){
    throw e;
}
}

//   @ApiBearerAuth('JWT-auth')
//   @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getreturnreqbyId/:id')
    @ApiParam({
        name:'id',
        type:Number,
        required:true
    })
    async getreturnreqbyId(@Param('id') id:Number){
    try{
        return await this.returnService.getreturnreqbyId(id);
    }
    catch(e){
        throw e;
    }
    }

    @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
  @Put('updateReturnReqComplete/:returnId/:status')
  @ApiParam({type:Number, name:'returnId',required:true})
  @ApiParam({type:String, name:'status',required:true})
  async updateReturnReqComplete( @Param('returnId') returnId:string, @Param('status') status:string){
      try{
          return await this.returnService.updateReturnReqComplete(returnId, status)
      }
      catch(e){
          throw e;
      }
  }

}
