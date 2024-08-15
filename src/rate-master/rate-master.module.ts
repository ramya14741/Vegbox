import { Module } from '@nestjs/common';
import { RateMasterController } from './rate-master.controller';
import { RateMasterService } from './rate-master.service';
import { rateMasterProvider } from './rate-master.provider';

@Module({
  controllers: [RateMasterController],
  providers: [RateMasterService,...rateMasterProvider]
})
export class RateMasterModule {}
