import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { reviewProvider } from './review.provider';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService,...reviewProvider]
})
export class ReviewModule {}
