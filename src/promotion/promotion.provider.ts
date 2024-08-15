import {  PromotionData } from "./promotion.entity";

export const promotionProvider = [
    {
        provide : 'PROMOTION_REPOSITORY',
        useValue: PromotionData,
    }
]
