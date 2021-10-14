import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(args: CreateUserInput): Promise<string | User> {
    try {
      const existedUser = await this.userRepository.findOne({
        where: { email: args.email },
      });
      if (existedUser) {
        return 'this email is already taken ';
      }
      const newUser = await this.userRepository.create({ ...args });
      await this.userRepository.save(newUser);
      if (!newUser) return `Can't create an user`;
      return newUser;
    } catch (err) {
      return err.message;
    }
  }

  async getUser(id: number): Promise<string | User> {
    try {
      const user: User | undefined = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) return 'user not found';
      return user;
    } catch (err) {
      return err.message;
    }
  }

  async getUsers(): Promise<string | User[]> {
    try {
      const user: User[] | undefined = await this.userRepository.find();
      if (!user) return 'user not found';
      return user;
    } catch (err) {
      return err.message;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }
}
