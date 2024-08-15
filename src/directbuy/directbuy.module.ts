import { Module } from '@nestjs/common';
import { DirectbuyController } from './directbuy.controller';
import { DirectbuyService } from './directbuy.service';
import { directBuyProvider } from './directbuy.provider';
import { productProvider } from '../product/product.provider';
import { ProductService } from '../product/product.service';
import { promotionProvider } from '../promotion/promotion.provider';
import { PromotionService } from '../promotion/promotion.service';
import { CategoryService } from '../category/category.service';
import { categoryProvider } from '../category/category.provider';
import { couponProvider } from '../coupoun/coupon.provider';
import { CoupounService } from '../coupoun/coupoun.service';

@Module({
  controllers: [DirectbuyController],
  providers: [CoupounService,...couponProvider,CategoryService,...categoryProvider,PromotionService,...promotionProvider,ProductService,...productProvider,DirectbuyService,...directBuyProvider]
})
export class DirectbuyModule {}
