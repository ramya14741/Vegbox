import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { stockProvider } from './stock.provider';
import { ProductService } from '../product/product.service';
import { productProvider } from '../product/product.provider';
import { ProductController } from '../product/product.controller';
import { CategoryService } from '../category/category.service';
import { categoryProvider } from '../category/category.provider';
import { PromotionService } from '../promotion/promotion.service';
import { promotionProvider } from '../promotion/promotion.provider';

@Module({
  controllers: [StockController],
  providers: [StockService,...stockProvider,ProductService,...productProvider,CategoryService,...categoryProvider,PromotionService,...promotionProvider]
})
export class StockModule {}
