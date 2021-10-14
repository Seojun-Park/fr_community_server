import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

class MockUserRepository {
  #data = [{ id: 1, email: 'test@community.com', nickname: 'jin' }];
  findById({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return null;
  }

  findByEmail({ where: { email } }) {
    const data = this.#data.find((v) => v.email === email);
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
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should find a user by id', () => {
    expect(service.findOne(1)).resolves.toStrictEqual({
      id: 1,
    });
  });
});
