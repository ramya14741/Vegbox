import { Test, TestingModule } from '@nestjs/testing';
import { RateMasterService } from './rate-master.service';

describe('RateMasterService', () => {
  let service: RateMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateMasterService],
    }).compile();

    service = module.get<RateMasterService>(RateMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
