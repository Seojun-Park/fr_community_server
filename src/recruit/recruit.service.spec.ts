import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Recruit } from './entity/recruit.entity';
import { RecruitService } from './recruit.service';

class MockRecruitRepository {
  #data = [
    {
      id: 1,
      title: 'test recruit',
      content: 'test',
      period: '01/01/2021 - 03/01/2021',
      location: 'paris',
      salary: '100',
      type: 'hiring',
    },
  ];
  findOne({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return 'no Recruit found';
  }
}

class MockUserRepository {}

describe('RecruitService', () => {
  let service: RecruitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecruitService,
        {
          provide: getRepositoryToken(Recruit),
          useClass: MockRecruitRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<RecruitService>(RecruitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return Recruit by id', () => {
    expect(service.getRecruit(1)).resolves.toStrictEqual({
      id: 1,
      title: 'test recruit',
      content: 'test',
      period: '01/01/2021 - 03/01/2021',
      location: 'paris',
      salary: '100',
      type: 'hiring',
    });
  });
});
