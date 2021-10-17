import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reply } from '../reply/entity/reply.entity';
import { User } from '../user/entity/user.entity';
import { BoardService } from './board.service';
import { Board } from './entity/board.entity';

class MockBoardRepository {
  #data = [
    {
      id: 1,
      title: 'board test',
      content: 'test',
      category: 'notice',
    },
    {
      id: 2,
      title: 'board test2',
      content: 'test2',
      category: 'notice2',
    },
  ];
  findOne({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return 'no Board found';
  }

  find() {
    return this.#data;
  }
}

class MockUserRepository {}
class MockReplyRepository {}

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useClass: MockBoardRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(Reply),
          useClass: MockReplyRepository,
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return Board by id', () => {
    expect(service.getBoard(1)).resolves.toStrictEqual({
      id: 1,
      title: 'board test',
      content: 'test',
      category: 'notice',
    });
  });

  it('Should return not found board', () => {
    expect(service.getBoard(2)).resolves.toBe('no Board found');
  });

  it('Should return all boards', () => {
    expect(service.getBoards()).resolves.toStrictEqual([
      {
        id: 1,
        title: 'board test',
        content: 'test',
        category: 'notice',
      },
      {
        id: 2,
        title: 'board test2',
        content: 'test2',
        category: 'notice2',
      },
    ]);
  });
});
