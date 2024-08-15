import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiConsumes, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { productDto } from '../product/product.dto';
import { ProductimagesService } from './productimages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../file-helper';
//import { Express } from 'express';
import { cloudinaryStorage } from '../cloudinary.config';
import { diskStorage } from 'multer';
import { productimagesDto } from './productimages.dto';
import { AuthGuard } from '@nestjs/passport';

export const uploadFile = (filename:string = 'file'):MethodDecorator=>(
    target:any,
    propertykey,
    descriptor:PropertyDescriptor,
)=>{
    ApiBody({
        schema:{
            type:'object',
            properties:{
                [filename]:{
                    type:'string',
                    format:'binary'
                },
            },
        },
    })(target, propertykey, descriptor)
};


@ApiTags('productimages')
@Controller('productimages')
export class ProductimagesController {
    constructor(private PimagesService:ProductimagesService){}

    //   @ApiBearerAuth('JWT-auth')
    //   @UseGuards(AuthGuard('firebase-jwt')) 
    @Get('get/:public_id')
    @ApiResponse({ status: 200, description: 'Image retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Image not found' })
    getImage(@Param('public_id') publicId: string) {
      return this.PimagesService.getImage(publicId);
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt-warehouseadmin')) 
    @Post('uploadImage')
    @ApiConsumes('multipart/form-data')
    @uploadFile('filename')
    @UseInterceptors(
      FileInterceptor(
          'filename',{
              fileFilter:imageFileFilter,
          }),
          )
    //@ApiBody({ type: 'multipart/form-data' })
    
    @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
    async uploadImage(@UploadedFile() file){
        try{
            return await this.PimagesService.uploadImage(file)
        }
        catch(e){
            throw e;
        }
    }
    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt-warehouseadmin')) 
    @Delete('delete/:public_id')
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Image not found or could not be deleted' })
  deleteImage(@Param('public_id') publicId: string) {
    return this.PimagesService.deleteImage(publicId);
  }
    
//   @ApiBearerAuth('JWT-auth')
//   @UseGuards(AuthGuard('firebase-jwt-warehouseadmin')) 
  @Post('addProductImage')
  @ApiBody({type:productimagesDto,required:true})
  async addProductImage(@Body() Product){
      try{
          return await this.PimagesService.addProductImage(Product)
      }
      catch(e){
          throw e;
      }
  }

//   @ApiBearerAuth('JWT-auth')
//   @UseGuards(AuthGuard('firebase-jwt')) 
  @Get('getImagesbyProductId/:id')
  @ApiParam({
      name:'id',
      type:Number,
      required:true
  })
  async getImagesbyProductId(@Param('id') id:Number){
  try{
      return await this.PimagesService.getImagesbyProductId(id);
  }
  catch(e){
      throw e;
  }
  }

//   @ApiBearerAuth('JWT-auth')
//   @UseGuards(AuthGuard('firebase-jwt-warehouseadmin')) 
  @Put('deleteImagebyPublicId/:idPublic')
  @ApiParam({type:String, name:'idPublic',required:true})
  async deleteImagebyPublicId(@Param('idPublic') idPublic:string){
      try {
          return await this.PimagesService.deleteImagebyPublicId(idPublic)
      }
      catch(e){
          throw e;
      }
  }
}
