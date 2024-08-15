import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { reviewDto } from './review.dto';
import { ReviewService } from './review.service';

@ApiTags('review')
@Controller('review')
export class ReviewController {
    constructor(private reviewService:ReviewService){}

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('addReview')
    @ApiBody({type:reviewDto,required:true})
    async addReview(@Body() review){
        try{
            return await this.reviewService.addReview(review)
        }
        catch(e){
            throw e;
        }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getreviewbyUserIdandProductId/:username/:productId')
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
    async getreviewbyUserIdandProductId(@Param('username') username:String, @Param('productId') productId:Number){
    try{
        return await this.reviewService.getreviewbyUserIdandProductId(username,productId);
    }
    catch(e){
        throw e;
    }
    }

    // @ApiExcludeEndpoint()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
@Put('updateReview/:idReview')
@ApiBody({type:reviewDto,required:true})
@ApiParam({type:Number, name:'idReview',required:true})
async updateReview(@Body() updateReview,@Param('idReview') idReview:number){
    try{
        return await this.reviewService.updateReview(updateReview,idReview)
    }
    catch(e){
        throw e;
    }
}

//@ApiExcludeEndpoint()
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Delete('deleteReviewbyId/:idReview')
@ApiParam({type:Number, name:'idReview',required:true})
async deleteReviewbyId(@Param('idReview') idReview:number){
    try {
        return await this.reviewService.deleteReviewbyId(idReview)
    }
    catch(e){
        throw e;
    }
}

// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt'))
@Get('getAllReviewbyProductId/:productId')

@ApiParam({
    name:'productId',
    type:Number,
    required:true
})
async getAllReviewbyProductId( @Param('productId') productId:Number){
try{
    return await this.reviewService.getAllReviewbyProductId(productId);
}
catch(e){
    throw e;
}
}
}
