import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { LikeService } from './like.service';

class MockLikeRepository {
  #data = [
    {
      id: 1,
      OwnerId: 1,
    },
  ];
  findOne({ where: { UserId } }) {
    const data = this.#data.find((v) => v.OwnerId === UserId);
    if (data) return data;
    return 'no Like found';
  }
}

describe('LikeService', () => {
  let service: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: getRepositoryToken(Like),
          useClass: MockLikeRepository,
        },
      ],
    }).compile();

    service = module.get<LikeService>(LikeService);
  });

  it('should return Like by UserId', () => {
    expect(service.getLike(1)).resolves.toStrictEqual({
      id: 1,
      OwnerId: 1,
    });
  });
});
