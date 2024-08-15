import { Module } from '@nestjs/common';
import { StripePaymentController } from './stripe-payment.controller';
import { StripePaymentService } from './stripe-payment.service';
import { StripeModule } from 'nestjs-stripe';
import { CartService } from '../cart/cart.service';
import { cartProvider } from '../cart/cart.provider';
import { ProductService } from '../product/product.service';
import { productProvider } from '../product/product.provider';
import { CategoryService } from '../category/category.service';
import { categoryProvider } from '../category/category.provider';
import { CoupounService } from '../coupoun/coupoun.service';
import { couponProvider } from '../coupoun/coupon.provider';
import { OrderService } from '../order/order.service';
import { orderProvider } from '../order/order.provider';
import { StockService } from '../stock/stock.service';
import { stockProvider } from '../stock/stock.provider';
import { PromotionService } from '../promotion/promotion.service';
import { promotionProvider } from '../promotion/promotion.provider';
import { directBuyProvider } from '../directbuy/directbuy.provider';
import { DirectbuyService } from '../directbuy/directbuy.service';
const dotenv =require('dotenv');
dotenv.config();

@Module({
  // imports: [
  //   StripeModule.forRoot({
  //     apiKey: process.env.stripesecret
  //     //apiVersion: '2020-08-27',
  //   }),
  // ],
  controllers: [StripePaymentController],
  providers: [DirectbuyService,...directBuyProvider,StripePaymentService, CartService,...cartProvider, ProductService,...productProvider,CategoryService,...categoryProvider, CoupounService,...couponProvider, OrderService,...orderProvider, StockService,...stockProvider,PromotionService,...promotionProvider]
})
export class StripePaymentModule {}
