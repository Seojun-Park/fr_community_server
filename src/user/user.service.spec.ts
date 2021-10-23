import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

class MockUserRepository {
  #data = [{ id: 1, email: 'test@community.com', nickname: 'jin' }];
  findOne({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return null;
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        MailerService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return user by id', () => {
    expect(service.getUser(1)).resolves.toStrictEqual({
      id: 1,
      email: 'test@community.com',
      nickname: 'jin',
    });
  });

  it('Should return null when no user with the provided id', () => {
    expect(service.getUser(2)).resolves.toBe('user not found');
  });
});
