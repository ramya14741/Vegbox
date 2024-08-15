import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { deliveryPersonnelDto } from './delivery-personnel.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { DeliveryPersonnelService } from './delivery-personnel.service';

@ApiTags('delivery-personnel')
@Controller('delivery-personnel')
export class DeliveryPersonnelController {
    constructor(private dpService:DeliveryPersonnelService){}

    //@ApiExcludeEndpoint()
    
    
//     @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-deliveryadmin'))
    @Post('addDeliveryPersonnel')
    @ApiBody({type:deliveryPersonnelDto,required:true})
    async addDeliveryPersonnel(@Body() dp){
        try{
            return await this.dpService.addDeliveryPersonnel(dp)
        }
        catch(e){
            throw e;
        }
    }
    
    // @ApiExcludeEndpoint()
//     @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt-deliveryadmin'))
    @Put('updateDeliveryPersonnel/:dpId')
    @ApiBody({type:deliveryPersonnelDto,required:true})
    @ApiParam({type:Number, name:'dpId',required:true})
    async updateDeliveryPersonnel(@Body() dp,@Param('dpId') dpId:string){
        try{
            return await this.dpService.updateDeliveryPersonnel(dp,dpId)
        }
        catch(e){
            throw e;
        }
    }

    //@ApiBearerAuth()
//@UseGuards(AuthGuard('User'))
@Get('getDeliveryPersonnelbyId/:id')
@ApiParam({
    name:'id',
    type:String,
    required:true
})
async getDeliveryPersonnelbyId(@Param('id') id:String){
try{
    return await this.dpService.getDeliveryPersonnelbyId(id);
}
catch(e){
    throw e;
}
}

// @ApiBearerAuth()
// @UseGuards(AuthGuard('User'))
@Delete('deletedeliveryPersonnelbyId/:id')
@ApiParam({type:Number, name:'id', required:true})
async deletedeliveryPersonnelbyId(@Param('id') id:number){
    try{
        return await this.dpService.deletedeliveryPersonnelbyId(id)
    }
    catch(e){
        throw e;
    }
}
    
}

