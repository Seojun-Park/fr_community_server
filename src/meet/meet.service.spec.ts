import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meet } from './entity/meet.entity';
import { MeetMember } from './entity/meetMember.entity';
import { MeetService } from './meet.service';

class MockMeetRepository {
  #data = [
    {
      id: 1,
      title: 'meet test',
      content: 'test',
      price: '123',
      location: 'paris',
      category: 'class',
    },
  ];
  findOne({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return 'no Meet found';
  }
}

class MockMeetMemberRepository {}
describe('MeetService', () => {
  let service: MeetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetService,
        {
          provide: getRepositoryToken(Meet),
          useClass: MockMeetRepository,
        },
        {
          provide: getRepositoryToken(MeetMember),
          useClass: MockMeetMemberRepository,
        },
      ],
    }).compile();

    service = module.get<MeetService>(MeetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return Meet by id', () => {
    expect(service.getMeet(1)).resolves.toStrictEqual({
      id: 1,
      title: 'meet test',
      content: 'test',
      price: '123',
      location: 'paris',
      category: 'class',
    });
  });
});
