import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Dm } from '../dm/entity/dm.entity';
import { User } from '../user/entity/user.entity';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity';

class MockChatRepository {
  #data = [
    {
      id: 1,
    },
  ];

  findOne({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return 'no Chat found';
  }
}

class MockDmRepository {}
class MockUserRepository {}

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getRepositoryToken(Chat),
          useClass: MockChatRepository,
        },
        {
          provide: getRepositoryToken(Dm),
          useClass: MockDmRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return Chat by id', () => {
    expect(service.getChat(1)).resolves.toStrictEqual({
      id: 1,
    });
  });

  it('Should return not found chat', () => {
    expect(service.getChat(2)).resolves.toBe('no Chat found');
  });
});
