import { Test, TestingModule } from '@nestjs/testing';
import { DmService } from './dm.service';

describe('DmService', () => {
  let service: DmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmService],
    }).compile();

    service = module.get<DmService>(DmService);
  });
  it('tmp', () => {
    expect(console.log('e'));
  });
});
