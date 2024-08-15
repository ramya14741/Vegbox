import { Test, TestingModule } from '@nestjs/testing';
import { CoupounService } from './coupoun.service';

describe('CoupounService', () => {
  let service: CoupounService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoupounService],
    }).compile();

    service = module.get<CoupounService>(CoupounService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
