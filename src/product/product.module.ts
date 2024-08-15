import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProvider } from './product.provider';
import { categoryProvider } from '../category/category.provider';
import { PromotionService } from '../promotion/promotion.service';
import { promotionProvider } from '../promotion/promotion.provider';
import { StockService } from '../stock/stock.service';
import { stockProvider } from '../stock/stock.provider';
import { directBuyProvider } from '../directbuy/directbuy.provider';
import { DirectbuyService } from '../directbuy/directbuy.service';
import { CoupounService } from '../coupoun/coupoun.service';
import { couponProvider } from '../coupoun/coupon.provider';

@Module({
  
  controllers: [ProductController],
  providers: [CoupounService,...couponProvider,DirectbuyService,...directBuyProvider,ProductService,...productProvider,...categoryProvider,PromotionService,...promotionProvider,StockService,...stockProvider]
})
export class ProductModule {}
