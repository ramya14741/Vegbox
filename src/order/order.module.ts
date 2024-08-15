import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProvider } from './order.provider';
import { StockService } from '../stock/stock.service';
import { stockProvider } from '../stock/stock.provider';
import { CartService } from '../cart/cart.service';
import { cartProvider } from '../cart/cart.provider';
import { ProductService } from '../product/product.service';
import { productProvider } from '../product/product.provider';
import { couponProvider } from '../coupoun/coupon.provider';
import { CoupounService } from '../coupoun/coupoun.service';
import { CategoryService } from '../category/category.service';
import { categoryProvider } from '../category/category.provider';
import { promotionProvider } from '../promotion/promotion.provider';
import { PromotionService } from '../promotion/promotion.service';
import { DirectbuyService } from '../directbuy/directbuy.service';
import { directBuyProvider } from '../directbuy/directbuy.provider';

@Module({
  controllers: [OrderController],
  providers: [DirectbuyService,...directBuyProvider,OrderService,...orderProvider,StockService,...stockProvider, CartService,...cartProvider,  ProductService,...productProvider,...couponProvider,CoupounService, CategoryService,...categoryProvider,...promotionProvider,PromotionService]
})
export class OrderModule {}
