import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
import { User } from './entity/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

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
      if (!user) return 'Fail to request user list';
      if (user.length === 0) return 'no user registed';
      return user;
    } catch (err) {
      return err.message;
    }
  }

  async createUser(args: CreateUserInput): Promise<string | User> {
    try {
      const { email, firstName, nickname, lastName, password } = args;
      const existedUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existedUser) {
        return 'this email is already taken ';
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.create({
        email,
        firstName,
        lastName,
        nickname,
        password: hashedPassword,
      });
      const savedUser = await this.userRepository.save(newUser);
      if (!newUser) return `Can't create an user`;
      return savedUser;
    } catch (err) {
      return err.message;
    }
  }

  async editUser(args: EditUserInput): Promise<string | User> {
    try {
      const { id, firstName, lastName, nickname } = args;
      const user: User | undefined = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) return 'user not found';
      const prevValue: {
        firstName: string;
        lastName: string;
        nickname: string;
      } = {
        firstName,
        lastName,
        nickname,
      };
      user.firstName = firstName || prevValue.firstName;
      user.lastName = lastName || prevValue.lastName;
      user.nickname = nickname || prevValue.nickname;
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (err) {
      return err.message;
    }
  }

  async changePassword(
    id: number,
    password: string,
    newPassword: string,
  ): Promise<string | User> {
    try {
      const user: User | undefined = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) return 'no user found';
      const pwdCheck = await bcrypt.compare(password, user.password);
      if (!pwdCheck) return 'password is not matched';
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (err) {
      return err.message;
    }
  }
}
