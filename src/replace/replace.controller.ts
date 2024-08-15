import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { returnreqDto } from '../return/return.dto';
import { ReplaceService } from './replace.service';
import { replacereqItemDto } from './replace.dto';

@ApiTags('replace')
@Controller('replace')
export class ReplaceController {
    constructor(private replaceService:ReplaceService){}
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('createReplaceRequest')
    @ApiBody({type:replacereqItemDto,required:true})
  async createReplaceRequest(
    @Body() returnreq
  ){
   try{
    return await this.replaceService.createReplaceRequest(returnreq);
   }
    catch(e){
        throw e;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt-superdeliveryadmin'))
  @Put('updatereplaceStatus/:replaceId/:orderId/:replacestatus')
  @ApiParam({type:String, name:'replaceId',required:true})
  @ApiParam({type:String, name:'orderId',required:true})
  @ApiParam({type:String, name:'replacestatus',required:true})
  async updatereplaceStatus(@Param('replacestatus') replacestatus:string,@Param('replaceId') replaceId:number,@Param('orderId') orderId:number){
      try{
          return await this.replaceService.updatereplaceStatus(replaceId,replacestatus,orderId)
      }
      catch(e){
          throw e;
      }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('firebase-jwt'))
  @Get('getreplaceforaOrder/:orderId')
  @ApiParam({
      name:'orderId',
      type:Number,
      required:true
  })
  async getreplaceforaOrder(@Param('orderId') orderId:number){
  try{
      return await this.replaceService.getreplaceforaOrder(orderId);
  }
  catch(e){
      throw e;
  }
  }

}
