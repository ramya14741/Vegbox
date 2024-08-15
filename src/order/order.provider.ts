import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';



export const orderProvider = [
    {
        provide : 'ORDER_REPOSITORY',
        useValue: Order
    }
]
