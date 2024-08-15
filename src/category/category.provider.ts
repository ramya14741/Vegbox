import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';


export const categoryProvider = [
    {
        provide : 'CATEGORY_REPOSITORY',
        useValue: Category
    }
]
