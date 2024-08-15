import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiTags, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { stockDto } from './stock.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('stock')
@Controller('stock')
export class StockController {
    constructor(private stockService:StockService){}

    @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
    @Get('getStocks')
    async getStocks()
    {
    try{
        return await this.stockService.getStocks();
    }
    catch(e){
        throw e;
    }
    }
    //@ApiExcludeEndpoint()
    
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
    @Post('addStock')
    @ApiBody({type:stockDto,required:true})
    async addProduct(@Body() stock){
        try{
            return await this.stockService.addStock(stock)
        }
        catch(e){
            throw e;
        }
    }
    
    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
    @Put('updateStock/:idStock')
    @ApiBody({type:stockDto,required:true})
    @ApiParam({type:String, name:'idStock',required:true})
    async updateStock(@Body() stock,@Param('idStock') idStock:string){
        try{
            return await this.stockService.updateStock(stock,idStock)
        }
        catch(e){
            throw e;
        }
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
    @Put('increaseStockbyStockId/:idStock/:increaseNumber')
    @ApiParam({type:Number, name:'idStock',required:true})
    @ApiParam({type:Number, name:'increaseNumber',required:true})
    async increaseStockbyStockId(@Param('increaseNumber') increaseNumber:number,
    @Param('idStock') idStock:number){
        try{
            // const parsedIncreaseNumber = parseInt(increaseNumber); // Parse increaseNumber to a number
            // if (isNaN(parsedIncreaseNumber)) {
            //   throw new Error('Invalid increaseNumber'); // Handle invalid number scenario
            // }
            return await this.stockService.increaseStockbyStockId(increaseNumber,idStock)
        }
        catch(e){
            throw e;
        }
    }


    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
    @Put('decreaseStockbyStockId/:idStock/:decreaseNumber')
    @ApiParam({type:Number, name:'idStock',required:true})
    @ApiParam({type:Number, name:'decreaseNumber',required:true})
    async decreaseStockbyStockId(@Param('decreaseNumber') decreaseNumber:number,@Param('idStock') idStock:number){
        try{
            return await this.stockService.decreaseStockbyStockId(decreaseNumber,idStock)
        }
        catch(e){
            throw e;
        }
    }
    
    @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
    @Put('deleteStockbyId/:idStock')
    @ApiParam({type:String, name:'idStock',required:true})
    async deleteStockbyId(@Param('idStock') idStock:string){
        try {
            return await this.stockService.deleteStockbyId(idStock)
        }
        catch(e){
            throw e;
        }
    }
    
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
      @Get('getStockbyId/:id')
      @ApiParam({
          name:'id',
          type:Number,
          required:true
      })
      async getStockbyId(@Param('id') id:Number){
      try{
          return await this.stockService.getStockbyId(id);
      }
      catch(e){
          throw e;
      }
      }

      @ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
      @Get('getStockbyproductId/:id')
      @ApiParam({
          name:'id',
          type:Number,
          required:true
      })
      async getStockbyproductId(@Param('id') id:Number){
      try{
          return await this.stockService.getStockbyproductId(id);
      }
      catch(e){
          throw e;
      }
      }

      @ApiBearerAuth('JWT-auth')
      @UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
      @Get('getAllStockbyPageNo/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getAllStockbyPageNo(@Param('pageno')pageno:Number){
    try{
        return await this.stockService.getAllStockbyPageNo(pageno);
    }
    catch(e){
        throw e;
    }
}


@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
@Get('getNewAddedStockbyPageNo/:pageno')
@ApiParam({
    type:Number,
    name:'pageno',
    required:true
})
async getNewAddedStockbyPageNo(@Param('pageno')pageno:Number){
    try{
        return await this.stockService.getNewAddedStockbyPageNo(pageno);
    }
    catch(e){
        throw e;
    }
}

// @Get('searchStock/:text/:pageno')
// @ApiParam({type:String, name:'text',required:true})
// async searchStock(@Param('text') text:string,@Param('pageno') pageno:string){
//     try{
//         return await this.stockService.searchStock(text,pageno);
//     }
//     catch(e){
//         return e;
//     }
// }

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('firebase-jwt-warehouseadmin'))
    @Get('getReservedStocks')
    async getReservedStocks()
    {
    try{
        return await this.stockService.getReservedStocks();
    }
    catch(e){
        throw e;
    }
    }
}
