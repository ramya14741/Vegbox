import { Module } from '@nestjs/common';
import { DeliveryPersonnelController } from './delivery-personnel.controller';
import { DeliveryPersonnelService } from './delivery-personnel.service';
import { deliveryPersonnelsProvider } from './delivery-personnel.provider';

@Module({
  controllers: [DeliveryPersonnelController],
  providers: [DeliveryPersonnelService,...deliveryPersonnelsProvider]
})
export class DeliveryPersonnelModule {}
