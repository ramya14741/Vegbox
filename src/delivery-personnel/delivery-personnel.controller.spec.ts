import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPersonnelController } from './delivery-personnel.controller';

describe('DeliveryPersonnelController', () => {
  let controller: DeliveryPersonnelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryPersonnelController],
    }).compile();

    controller = module.get<DeliveryPersonnelController>(DeliveryPersonnelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
