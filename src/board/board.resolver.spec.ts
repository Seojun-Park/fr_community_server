import { Test, TestingModule } from '@nestjs/testing';
import { BoardResolver } from './board.resolver';

describe('BoardResolver', () => {
  let resolver: BoardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardResolver],
    }).compile();

    resolver = module.get<BoardResolver>(BoardResolver);
  });
  it('tmp', () => {
    expect(console.log('later'));
  });
});
