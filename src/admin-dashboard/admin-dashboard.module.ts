import { Module } from '@nestjs/common';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminDashboardService } from './admin-dashboard.service';
import { OrderService } from '../order/order.service';
import { OrderModule } from '../order/order.module';
import { orderProvider } from '../order/order.provider';
import { OrderController } from '../order/order.controller';
import { stockProvider } from '../stock/stock.provider';
import { StockService } from '../stock/stock.service';
import { CartService } from '../cart/cart.service';
import { cartProvider } from '../cart/cart.provider';
import { ProductService } from '../product/product.service';
import { productProvider } from '../product/product.provider';
import { CoupounService } from '../coupoun/coupoun.service';
import { couponProvider } from '../coupoun/coupon.provider';
import { categoryProvider } from '../category/category.provider';
import { CategoryService } from '../category/category.service';
import { ReturnService } from '../return/return.service';
import { returnProvider, returnReqItemProvider } from '../return/return.provider';
import { StripePaymentService } from '../stripe-payment/stripe-payment.service';
import { PromotionService } from '../promotion/promotion.service';
import { promotionProvider } from '../promotion/promotion.provider';
import { DirectbuyService } from '../directbuy/directbuy.service';
import { directBuyProvider } from '../directbuy/directbuy.provider';

@Module({
  controllers: [AdminDashboardController],
  providers: [DirectbuyService,...directBuyProvider,AdminDashboardService,OrderService,...orderProvider, StockService,...stockProvider, CartService,...cartProvider, ProductService,...productProvider,...couponProvider,
    CoupounService,...categoryProvider,CategoryService, ReturnService,...returnProvider,...returnReqItemProvider,StripePaymentService,PromotionService,...promotionProvider]
})
export class AdminDashboardModule {}
