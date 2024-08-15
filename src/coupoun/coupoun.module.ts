import { Module } from '@nestjs/common';
import { CoupounController } from './coupoun.controller';
import { CoupounService } from './coupoun.service';
import { couponProvider } from './coupon.provider';
import { directBuyProvider } from '../directbuy/directbuy.provider';
import { DirectbuyService } from '../directbuy/directbuy.service';
import { productProvider } from '../product/product.provider';
import { ProductService } from '../product/product.service';
import { promotionProvider } from '../promotion/promotion.provider';
import { PromotionService } from '../promotion/promotion.service';
import { categoryProvider } from '../category/category.provider';
import { CategoryService } from '../category/category.service';

@Module({
  controllers: [CoupounController],
  providers: [CategoryService,...categoryProvider,PromotionService,...promotionProvider,ProductService,...productProvider,DirectbuyService,...directBuyProvider,CoupounService,...couponProvider]
})
export class CoupounModule {}
