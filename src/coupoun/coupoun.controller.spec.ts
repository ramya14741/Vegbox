import { Test, TestingModule } from '@nestjs/testing';
import { CoupounController } from './coupoun.controller';

describe('CoupounController', () => {
  let controller: CoupounController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoupounController],
    }).compile();

    controller = module.get<CoupounController>(CoupounController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
