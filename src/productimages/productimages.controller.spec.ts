import { Test, TestingModule } from '@nestjs/testing';
import { ProductimagesController } from './productimages.controller';

describe('ProductimagesController', () => {
  let controller: ProductimagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductimagesController],
    }).compile();

    controller = module.get<ProductimagesController>(ProductimagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
