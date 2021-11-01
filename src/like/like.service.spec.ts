import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from '../board/entity/board.entity';
import { Market } from '../market/entity/market.entity';
import { Meet } from '../meet/entity/meet.entity';
import { Recruit } from '../recruit/entity/recruit.entity';
import { Rent } from '../rent/entity/rent.entity';
import { User } from '../user/entity/user.entity';
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
class MockUserRepository {}
class MockBoardRepository {}
class MockRentRepository {}
class MockRecruitRepository {}
class MockMeetRepository {}
class MockMarketRepository {}

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
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(Board),
          useClass: MockBoardRepository,
        },
        {
          provide: getRepositoryToken(Rent),
          useClass: MockRentRepository,
        },
        {
          provide: getRepositoryToken(Recruit),
          useClass: MockRecruitRepository,
        },
        {
          provide: getRepositoryToken(Meet),
          useClass: MockMeetRepository,
        },
        {
          provide: getRepositoryToken(Market),
          useClass: MockMarketRepository,
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
