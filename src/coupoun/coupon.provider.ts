import { Injectable } from '@nestjs/common';
import { Coupon } from './coupon.entity';


export const couponProvider = [
    {
        provide : 'COUPON_REPOSITORY',
        useValue: Coupon
    }
]
