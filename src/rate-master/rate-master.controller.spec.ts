import { Test, TestingModule } from '@nestjs/testing';
import { RateMasterController } from './rate-master.controller';

describe('RateMasterController', () => {
  let controller: RateMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateMasterController],
    }).compile();

    controller = module.get<RateMasterController>(RateMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
