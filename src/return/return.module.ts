import { Module, forwardRef } from '@nestjs/common';
import { ReturnController } from './return.controller';
import { ReturnService } from './return.service';
import { returnProvider, returnReqItemProvider } from './return.provider';
import { StripePaymentService } from '../stripe-payment/stripe-payment.service';
import { OrderService } from '../order/order.service';
import { orderProvider } from '../order/order.provider';
import { CartService } from '../cart/cart.service';
import { cartProvider } from '../cart/cart.provider';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { StockModule } from 'src/stock/stock.module';
import { StockService } from '../stock/stock.service';
import { OrderModule } from '../order/order.module';
import { CoupounModule } from '../coupoun/coupoun.module';
import { CartModule } from '../cart/cart.module';
import { StripeModule } from 'nestjs-stripe';
import { CoupounService } from '../coupoun/coupoun.service';
import { productProvider } from '../product/product.provider';
import { categoryProvider } from '../category/category.provider';
import { stockProvider } from '../stock/stock.provider';
import { couponProvider } from '../coupoun/coupon.provider';
import { promotionProvider } from '../promotion/promotion.provider';
import { PromotionService } from '../promotion/promotion.service';
import { directBuyProvider } from '../directbuy/directbuy.provider';
import { DirectbuyService } from '../directbuy/directbuy.service';

@Module({
  controllers: [ReturnController],
  providers: [DirectbuyService,...directBuyProvider,ReturnService,...returnProvider,...returnReqItemProvider,StripePaymentService, OrderService,...orderProvider, CartService,...cartProvider, ProductService, StockService, CoupounService,...productProvider,...categoryProvider,...stockProvider,...couponProvider,PromotionService,...promotionProvider]
})
export class ReturnModule {}
