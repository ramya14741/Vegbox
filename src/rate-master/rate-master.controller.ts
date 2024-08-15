import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RateMasterService } from './rate-master.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { rateMasterDto } from './rate-master.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('rate-master')
@Controller('rate-master')
export class RateMasterController {
    constructor(private rateMasterService:RateMasterService){}

    //@ApiExcludeEndpoint()
    
    
    @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
    @Post('addRateMater')
    @ApiBody({type:rateMasterDto,required:true})
    async addRateMater(@Body() rateMaster){
        try{
            return await this.rateMasterService.addRateMater(rateMaster)
        }
        catch(e){
            throw e;
        }
    }
    
    // @ApiExcludeEndpoint()
    @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
    @Put('updateRateMaster/:rateMasterId')
    @ApiBody({type:rateMasterDto,required:true})
    @ApiParam({type:Number, name:'rateMasterId',required:true})
    async updateRateMaster(@Body() rateMaster,@Param('rateMasterId') rateMasterId:string){
        try{
            return await this.rateMasterService.updateRateMaster(rateMaster,rateMasterId)
        }
        catch(e){
            throw e;
        }
    }
    
}
