import { Injectable } from '@nestjs/common';
import { Cart } from './cart.entity';



export const cartProvider = [
    {
        provide : 'CART_REPOSITORY',
        useValue: Cart
    }
]
