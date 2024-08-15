import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPersonnelService } from './delivery-personnel.service';

describe('DeliveryPersonnelService', () => {
  let service: DeliveryPersonnelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryPersonnelService],
    }).compile();

    service = module.get<DeliveryPersonnelService>(DeliveryPersonnelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
