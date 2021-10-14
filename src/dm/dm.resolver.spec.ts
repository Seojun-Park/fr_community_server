import { Test, TestingModule } from '@nestjs/testing';
import { DmResolver } from './dm.resolver';

describe('DmResolver', () => {
  let resolver: DmResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmResolver],
    }).compile();

    resolver = module.get<DmResolver>(DmResolver);
  });
  it('tmp', () => {
    expect(console.log('later'));
  });
});
