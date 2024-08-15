import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ratingDto } from './rating.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('rating')
@Controller('rating')
export class RatingController {
    constructor(private ratingService:RatingService){}

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('addRating')
    @ApiBody({type:ratingDto,required:true})
    async addRating(@Body() rating){
        try{
            return await this.ratingService.addRating(rating)
        }
        catch(e){
            throw e;
        }
    }

    @Get('getratingbyUserIdandProductId/:username/:productId')
    @ApiParam({
        name:'username',
        type:String,
        required:true
    })
    @ApiParam({
        name:'productId',
        type:Number,
        required:true
    })
    async getratingbyUserIdandProductId(@Param('username') username:String, @Param('productId') productId:Number){
    try{
        return await this.ratingService.getratingbyUserIdandProductId(username,productId);
    }
    catch(e){
        throw e;
    }
    }

    // @ApiExcludeEndpoint()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
@Put('updateRating/:idRating')
@ApiBody({type:ratingDto,required:true})
@ApiParam({type:Number, name:'idRating',required:true})
async updateRating(@Body() updateRating,@Param('idRating') idRating:number){
    try{
        return await this.ratingService.updateRating(updateRating,idRating)
    }
    catch(e){
        throw e;
    }
}

//@ApiExcludeEndpoint()
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Delete('deleteRatingbyId/:idRating')
@ApiParam({type:Number, name:'idRating',required:true})
async deleteRatingbyId(@Param('idRating') idRating:number){
    try {
        return await this.ratingService.deleteRatingbyId(idRating)
    }
    catch(e){
        throw e;
    }
}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt'))
@Get('getAllRatingbyProductId/:productId')

@ApiParam({
    name:'productId',
    type:Number,
    required:true
})
async getAllRatingbyProductId( @Param('productId') productId:Number){
try{
    return await this.ratingService.getAllRatingbyProductId(productId);
}
catch(e){
    throw e;
}
}
}
