import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { categoryProvider } from './category/category.provider';
import { ProductimagesModule } from './productimages/productimages.module';
import { MulterModule } from '@nestjs/platform-express';
import { RateMasterModule } from './rate-master/rate-master.module';
import { RatingModule } from './rating/rating.module';
import { CartModule } from './cart/cart.module';
import { CoupounModule } from './coupoun/coupoun.module';
import { AddressModule } from './address/address.module';
import { StripePaymentModule } from './stripe-payment/stripe-payment.module';
import { OrderModule } from './order/order.module';
import { StockModule } from './stock/stock.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { ReturnModule } from './return/return.module';
import { ReplaceController } from './replace/replace.controller';
import { ReplaceModule } from './replace/replace.module';
import { ReplaceService } from './replace/replace.service';
import { replaceProvider } from './replace/replace.provider';
import { OrderService } from './order/order.service';
import { orderProvider } from './order/order.provider';
import { StockService } from './stock/stock.service';
import { stockProvider } from './stock/stock.provider';
import { CartService } from './cart/cart.service';
import { cartProvider } from './cart/cart.provider';
import { ProductService } from './product/product.service';
import { productProvider } from './product/product.provider';
import { CoupounService } from './coupoun/coupoun.service';
import { couponProvider } from './coupoun/coupon.provider';
import { ReviewModule } from './review/review.module';
import { JwtModule } from '@nestjs/jwt';
import { DeliveryPersonnelModule } from './delivery-personnel/delivery-personnel.module';
import { PromotionModule } from './promotion/promotion.module';
import { promotionProvider } from './promotion/promotion.provider';
import { PromotionService } from './promotion/promotion.service';
import { StockController } from './stock/stock.controller';
import { VendorModule } from './vendor/vendor.module';
import { DirectbuyModule } from './directbuy/directbuy.module';
import { DirectbuyService } from './directbuy/directbuy.service';
import { directBuyProvider } from './directbuy/directbuy.provider';
const dotenv =require('dotenv');
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret:"techbrainvegbox",
      signOptions:{expiresIn:'90d'},
    }),
   // MongooseModule.forRoot(process.env.DATABASE),
    UserModule,
    DatabaseModule,
    MulterModule.register({ dest: './uploads' }),
    // FirebaseModule.forRoot({
    //   googleApplicationCredential:"src/config/firebaseserviceAccountKey.json"
    //  // databaseURL: process.env.FirebaseDatabase,
    // }),
    AuthModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    ProductimagesModule,
    RateMasterModule,
    RatingModule,
    CartModule,
    CoupounModule,
    AddressModule,
    StripePaymentModule,
    OrderModule,
    StockModule,
    WishlistModule,
    AdminDashboardModule,
    ReturnModule,
    ReplaceModule,
    ReviewModule,
    DeliveryPersonnelModule,
    PromotionModule,
    VendorModule,
    DirectbuyModule
  ],
  controllers: [AppController,CategoryController, ReplaceController,StockController],
  providers: [DirectbuyService,...directBuyProvider,AppService,CategoryService,...categoryProvider,ReplaceService,...replaceProvider,OrderService,...orderProvider
  ,StockService,...stockProvider,CartService,...cartProvider,ProductService,...productProvider,CoupounService,...couponProvider,...promotionProvider,PromotionService],
})
export class AppModule {
  constructor() {
    console.log('Firebase Admin SDK initialization executed.');
  }
}
