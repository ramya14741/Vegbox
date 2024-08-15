import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { cartProvider } from './cart.provider';
import { ProductService } from '../product/product.service';
import { productProvider } from '../product/product.provider';
import { ProductModule } from '../product/product.module';
import { CategoryService } from '../category/category.service';
import { categoryProvider } from '../category/category.provider';
import { CoupounService } from '../coupoun/coupoun.service';
import { couponProvider } from '../coupoun/coupon.provider';
import { promotionProvider } from '../promotion/promotion.provider';
import { PromotionService } from '../promotion/promotion.service';

@Module({
 // import:[ProductModule],
  controllers: [CartController],
  providers: [CartService,...cartProvider,ProductService,...productProvider,CategoryService,...categoryProvider, CoupounService,...couponProvider,...promotionProvider,PromotionService]
})
export class CartModule {}
