import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { ratingProvider } from './rating.provider';

@Module({
  controllers: [RatingController],
  providers: [RatingService,...ratingProvider]
})
export class RatingModule {}
