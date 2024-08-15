import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { promotionProvider } from './promotion.provider';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService,...promotionProvider]
})
export class PromotionModule {}
