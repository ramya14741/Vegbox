import { Injectable } from '@nestjs/common';
import { User } from './user.entity';


export const UserProvider = [
    {
        provide : 'USER_REPOSITORY',
        useValue: User,
    },
]
