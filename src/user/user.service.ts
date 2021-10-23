import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
import { User } from './entity/user.entity';
import bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { generateCode } from '../common/generate-code';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
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

  async getUserByEmail(email: string): Promise<string | User> {
    try {
      const user: User | undefined = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) return 'not User found';
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
      const verifiedCode = await generateCode();
      const newUser = await this.userRepository.create({
        email,
        firstName,
        lastName,
        nickname,
        password: hashedPassword,
        verifiedCode,
      });
      const savedUser = await this.userRepository.save(newUser);
      if (!newUser) return `Can't create an user`;
      await this.mailerService.sendMail({
        to: email,
        from: 'contact@test.com',
        subject: 'Testing sed email',
        html: `<b>welcome ${verifiedCode}</b>`,
      });
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

  async verifyEmail(email: string, code: string): Promise<string | User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) return 'no User found';
      if (user.verifiedCode === code) {
        user.verifiedCode = null;
        user.verified = true;
        return await this.userRepository.save(user);
      } else {
        return 'Code is not correct, check your email';
      }
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
