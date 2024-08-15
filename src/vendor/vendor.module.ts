import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { vendorProvider } from './vendor.provider';

@Module({
  controllers: [VendorController],
  providers: [VendorService,...vendorProvider]
})
export class VendorModule {}
