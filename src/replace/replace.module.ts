import { Module } from '@nestjs/common';
import { ReplaceService } from './replace.service';
import { replaceProvider } from './replace.provider';
import { OrderService } from '../order/order.service';
import { orderProvider } from '../order/order.provider';
import { StockService } from '../stock/stock.service';
import { stockProvider } from '../stock/stock.provider';
import { CartService } from '../cart/cart.service';
import { cartProvider } from '../cart/cart.provider';
import { ProductService } from '../product/product.service';
import { productProvider } from '../product/product.provider';
import { couponProvider } from '../coupoun/coupon.provider';
import { CoupounService } from '../coupoun/coupoun.service';
import { categoryProvider } from '../category/category.provider';
import { CategoryService } from '../category/category.service';
import { PromotionService } from '../promotion/promotion.service';
import { promotionProvider } from '../promotion/promotion.provider';
import { DirectbuyService } from '../directbuy/directbuy.service';
import { directBuyProvider } from '../directbuy/directbuy.provider';

@Module({
  providers: [DirectbuyService,...directBuyProvider,ReplaceService,...replaceProvider, OrderService,...orderProvider,StockService,...stockProvider,CartService,...cartProvider
  ,ProductService,...productProvider,...couponProvider,CoupounService,...categoryProvider,CategoryService,PromotionService,...promotionProvider]
})
export class ReplaceModule {}
