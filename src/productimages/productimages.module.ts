import { Module } from '@nestjs/common';
import { ProductimagesController } from './productimages.controller';
import { ProductimagesService } from './productimages.service';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryStorage } from '../cloudinary.config';
import { productImagesProvider } from './productimages.provider';

@Module({
  imports: [
    MulterModule.register({
      storage: cloudinaryStorage,
    }),
  ],
  controllers: [ProductimagesController],
  providers: [ProductimagesService,...productImagesProvider]
})
export class ProductimagesModule {}
