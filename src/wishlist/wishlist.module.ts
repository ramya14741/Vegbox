import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { wishLIstProvider } from './wishlist.provider';

@Module({
  controllers: [WishlistController],
  providers: [WishlistService,...wishLIstProvider]
})
export class WishlistModule {}
