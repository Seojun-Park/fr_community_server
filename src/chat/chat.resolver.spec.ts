import { Test, TestingModule } from '@nestjs/testing';
import { ChatResolver } from './chat.resolver';

describe('ChatResolver', () => {
  let resolver: ChatResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatResolver],
    }).compile();

    resolver = module.get<ChatResolver>(ChatResolver);
  });
  it('tmp', () => {
    expect(console.log('later'));
  });
});
