
import { Database } from "./database.interface";
import {Sequelize} from 'sequelize-typescript'
import * as dotenv from 'dotenv';
import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";
import { Product } from "../product/product.entity";
import { ProductImages } from "../productimages/productimages.entity";
import { RateMaster } from "../rate-master/rate-master.entity";
import { Rating } from "../rating/rating.entity";
import { Cart } from "../cart/cart.entity";
import { Address } from "../address/address.entity";
import { Coupon } from "../coupoun/coupon.entity";
import { Order } from "../order/order.entity";
import { Stock } from "../stock/stock.entity";
import { Wishlist } from "../wishlist/wishlist.entity";
import { Return, ReturnReqItem } from "../return/return.entity";
import { Replace } from "../replace/replace.entity";
import { Review } from "../review/review.entity";
import { DeliveryPersonnel } from "../delivery-personnel/delivery-personnel.entity";
import {PromotionData } from "../promotion/promotion.entity";
import { Vendor } from "../vendor/vendor.entity";
import { DirectBuy } from "../directbuy/directbuy.entity";
dotenv.config();

//require('dotenv').config();
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
//import {dotenv} from '../'
// const path = require('path')
// const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../dotenv') })


export const databaseConfig:Database={
    dialect:"mysql",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    define: {
        freezeTableName: true
      },
};

export const DatabaseProviders  =[
    {
        provide: 'Sequelize',
        useFactory:async()=>{
            const sequelize = new Sequelize(databaseConfig);
            sequelize.addModels([DirectBuy,Vendor,PromotionData,DeliveryPersonnel,Review,Replace,User,Category,Product,ProductImages,RateMaster,Rating, Cart, Address, Coupon, Order, Stock, Wishlist,Return,ReturnReqItem]);
            try{
               await sequelize.sync();
               await sequelize.authenticate();
            }
            catch(e){
                throw e.message;
            }
            return sequelize;
        }

    }
]
