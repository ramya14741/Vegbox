import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { categoryDto } from './category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){}

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt'))
    @Get('getCategories')
async getCategories()
{
try{
    return await this.categoryService.getCategories();
}
catch(e){
    throw e;
}
}
//@ApiExcludeEndpoint()

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
@Post('addCategory')
// @ApiParam({type:String, name:'categoryId',required:true})
// @ApiParam({type:String, name:'categoryName',required:true})
@ApiBody({type:categoryDto,required:true})
async addCategory(@Body() Category){
    try{
        return await this.categoryService.addCategory(Category)
    }
    catch(e){
        throw e;
    }
}

// @ApiExcludeEndpoint()
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superwarehouseadmin'))
@Put('updateCategory/:idCategory')
@ApiBody({type:categoryDto,required:true})
@ApiParam({type:String, name:'idCategory',required:true})
async updateCategory(@Body() category,@Param('idCategory') idCategory:string){
    try{
        return await this.categoryService.updateCategory(category,idCategory)
    }
    catch(e){
        throw e;
    }
}

//@ApiExcludeEndpoint()
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-superadmin'))
@Put('deleteCategorybyId/:idCategory')
@ApiParam({type:String, name:'idCategory',required:true})
async deleteCategorybyId(@Param('idCategory') idCategory:string){
    try {
        return await this.categoryService.deleteCategorybyId(idCategory)
    }
    catch(e){
        throw e;
    }
}

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt'))
  @Get('getCategorybyId/:id')
  @ApiParam({
      name:'id',
      type:Number,
      required:true
  })
  async getCategorybyId(@Param('id') id:Number){
  try{
      return await this.categoryService.getCategorybyId(id);
  }
  catch(e){
      throw e;
  }
  }

}
