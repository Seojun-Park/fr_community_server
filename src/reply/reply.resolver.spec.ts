import { Test, TestingModule } from '@nestjs/testing';
import { ReplyResolver } from './reply.resolver';

describe('ReplyResolver', () => {
  let resolver: ReplyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyResolver],
    }).compile();

    resolver = module.get<ReplyResolver>(ReplyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
