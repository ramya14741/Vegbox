import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { productDto } from './product.dto';
import { productfilterDto, productfiltercategoryPriceDto, productfiltercategorypriceratingDto, productfiltertextPriceDto, productfiltertextpriceratingDto } from './filter.dto';
import { productrateDto } from './productRateDto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){}

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getProducts')
    async getProducts()
    {
    try{
        return await this.productService.getProducts();
    }
    catch(e){
        throw e;
    }
    }
    //@ApiExcludeEndpoint()
    
    @ApiBearerAuth('JWT-auth')
      @UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
    @Post('addProduct')
    @ApiBody({type:productDto,required:true})
    async addProduct(@Body() Product){
        try{
            return await this.productService.addProduct(Product)
        }
        catch(e){
            throw e;
        }
    }
    
    // @ApiExcludeEndpoint()
    @ApiBearerAuth('JWT-auth')
      @UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
    @Put('updateProduct/:idProduct')
    @ApiBody({type:productDto,required:true})
    @ApiParam({type:String, name:'idProduct',required:true})
    async updateProduct(@Body() product,@Param('idProduct') idProduct:string){
        try{
            return await this.productService.updateProduct(product,idProduct)
        }
        catch(e){
            throw e;
        }
    }
    
    //@ApiExcludeEndpoint()
    @ApiBearerAuth('JWT-auth')
      @UseGuards(AuthGuard('firebase-jwt-superadmin'))
    @Put('deleteProductbyId/:idProduct')
    @ApiParam({type:String, name:'idProduct',required:true})
    async deleteProductbyId(@Param('idProduct') idProduct:string){
        try {
            return await this.productService.deleteProductbyId(idProduct)
        }
        catch(e){
            throw e;
        }
    }
    
//     @ApiBearerAuth('JWT-auth')
//   @UseGuards(AuthGuard('firebase-jwt'))
      @Get('getProductbyId/:id')
      @ApiParam({
          name:'id',
          type:Number,
          required:true
      })
      async getProductbyId(@Param('id') id:Number){
      try{
          return await this.productService.getProductbyId(id);
      }
      catch(e){
          throw e;
      }
      }
      @Get('getAllSpecialPromotionProducts/:PromotionId')
      @ApiParam({
          name:'PromotionId',
          type:Number,
          required:true
      })
      async getAllSpecialPromotionProducts(@Param('PromotionId') PromotionId:Number){
      try{
          return await this.productService.getAllSpecialPromotionProducts(PromotionId);
      }
      catch(e){
          throw e;
      }
      }


      @ApiBearerAuth('JWT-auth')
      @UseGuards(AuthGuard('firebase-jwt'))
      @Get('findAllProductsbyPageNo/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async findAllProductsbyPageNo(@Param('pageno')pageno:Number){
    try{
        return await this.productService.findAllProductsbyPageNo(pageno);
    }
    catch(e){
        throw e;
    }
}


@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
@Get('getNewArrivalProductsbyPageNo/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getNewArrivalProductsbyPageNo(@Param('pageno')pageno:Number){
    try{
        return await this.productService.getNewArrivalProductsbyPageNo(pageno);
    }
    catch(e){
        throw e;
    }
}
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
@Get('getTotalProductCount')
async getTotalProductCount(){
try{
    return await this.productService.getTotalProductCount();
}
catch(e){
    throw e;
}
}
// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard('firebase-jwt'))
@Get('getProductbyCategory/:idCategory/:pageno')
@ApiParam({
    name:'idCategory',
    type:Number,
    required:true
})
@ApiParam({
    name:'pageno',
    type:Number,
    required:true
})
async getProductbyCategory(@Param('idCategory') idCategory:Number,@Param('pageno') pageno:Number){
try{
    return await this.productService.getProductbyCategory(idCategory,pageno);
}
catch(e){
    throw e;
}
}


@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
@Get('getAdminProductData/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getAdminProductData(@Param('pageno')pageno:Number){
    try{
        return await this.productService.getAdminProductData(pageno);
    }
    catch(e){
        throw e;
    }
}

 //@ApiExcludeEndpoint()
    
//  @ApiBearerAuth('JWT-auth')
//  @UseGuards(AuthGuard('firebase-jwt'))
    @Post('filterprSearchCriteria/:pageno')
    @ApiBody({type:productfilterDto,required:true})
    @ApiParam({
        type:Number,
        name:'pageno',
        required:true
    })
    async filterprSearchCriteria(@Body() productFilter,@Param('pageno') pageno:Number){
        try{
            return await this.productService.filterprSearchCriteria(productFilter,pageno)
        }
        catch(e){
            throw e;
        }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Post('filterproductbytextandPrice/:pageno')
    @ApiBody({type:productfiltertextPriceDto,required:true})
    @ApiParam({
        type:Number,
        name:'pageno',
        required:true
    })
    async filterproductbytextandPrice(@Body() productFilter,@Param('pageno') pageno:Number){
        try{
            return await this.productService.filterproductbytextandPrice(productFilter,pageno)
        }
        catch(e){
            throw e;
        }
    }
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt'))
    @Post('calculateEachProductPrice')
    @ApiBody({type:productrateDto,required:true})
    async calculateEachProductPrice(@Body() priceData){
        try{
            return await this.productService.calculateEachProductPrice(priceData)
        }
        catch(e){
            throw e;
        }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Post('filterproductbytextPriceRating/:pageno')
    @ApiBody({type:productfiltertextpriceratingDto,required:true})
    @ApiParam({
        type:Number,
        name:'pageno',
        required:true
    })
    async filterproductbytextPriceRating(@Body() productFilter,@Param('pageno') pageno:Number){
        try{
            return await this.productService.filterproductbytextPriceRating(productFilter,pageno)
        }
        catch(e){
            throw e;
        }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Post('filterproductbyCategoryandPrice/:pageno')
    @ApiBody({type:productfiltercategoryPriceDto,required:true})
    @ApiParam({
        type:Number,
        name:'pageno',
        required:true
    })
    async filterproductbyCategoryandPrice(@Body() productFilter,@Param('pageno') pageno:Number){
        try{
            return await this.productService.filterproductbyCategoryandPrice(productFilter,pageno)
        }
        catch(e){
            throw e;
        }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Post('filterproductbyCategoryPriceRating/:pageno')
    @ApiBody({type:productfiltercategorypriceratingDto,required:true})
    @ApiParam({
        type:Number,
        name:'pageno',
        required:true
    })
    async filterproductbyCategoryPriceRating(@Body() productFilter,@Param('pageno') pageno:Number){
        try{
            return await this.productService.filterproductbyCategoryPriceRating(productFilter,pageno)
        }
        catch(e){
            throw e;
        }
    }

    @ApiBearerAuth('JWT-auth')
      @UseGuards(AuthGuard('firebase-jwt-superadmin'))
    @Put('activateProductbyId/:idProduct')
    @ApiParam({type:String, name:'idProduct',required:true})
    async activateProductbyId(@Param('idProduct') idProduct:string){
        try {
            return await this.productService.activateProductbyId(idProduct)
        }
        catch(e){
            throw e;
        }
    }
    }
    
