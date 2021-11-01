import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
import { User } from './entity/user.entity';
import bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { generateCode } from '../common/generate-code';
import { JwtService } from '@nestjs/jwt';
import { generateWord } from '../common/generate-word';
import { Like as LikeEntity } from '../like/entity/like.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
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
      if (!newUser) return `Can't create an user`;
      const user = await this.userRepository.save(newUser);
      const like = new LikeEntity();
      like.OwnerId = user.id;
      like.Boards = [];
      like.Markets = [];
      like.Rents = [];
      like.Recruits = [];
      like.Meets = [];
      await this.likeRepository.save(like);
      await this.mailerService.sendMail({
        to: email,
        from: 'contact@test.com',
        subject: 'Testing sed email',
        html: `<b>welcome ${verifiedCode}</b>`,
      });
      return await this.userRepository.save(user);
    } catch (err) {
      return err.message;
    }
  }

  async sendNewCode(email: string): Promise<string | User> {
    try {
      const existedUser = await this.userRepository.findOne({
        where: { email },
      });
      if (!existedUser) {
        return 'no User found';
      }
      const verifiedCode = await generateCode();
      existedUser.verifiedCode = verifiedCode;
      await this.mailerService.sendMail({
        to: email,
        from: 'contact@test.com',
        subject: 'Testing send email',
        html: `<b>welcome ${verifiedCode}</b>`,
      });
      return await this.userRepository.save(existedUser);
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

  async sendNewPassword(
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<string | User> {
    try {
      const user: User | undefined = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      if (!user) return '해당 이메일의 유저를 찾을 수 없습니다';
      if (user.firstName !== firstName)
        return '이름이 틀립니다 다시 한번 확인 해 주세요';
      if (user.lastName !== lastName)
        return '성이 틀립니다 다시 한번 확인해 주세요';
      const newPassword: string = await generateWord();
      await this.mailerService.sendMail({
        to: email,
        from: 'contact@test.com',
        subject: '변경된 비밀번호 입니다',
        html: `<b>새로운 비밀번호는 ${newPassword} 입니다</b>`,
      });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      return await this.userRepository.save(user);
    } catch (err) {
      return err.message;
    }
  }

  async getMe(token: string): Promise<string | User> {
    try {
      const decoded: any = await this.jwtService.verify(
        token.includes(' ') ? token.split(' ')[1] : token,
        { secret: process.env.JWT_SECRET || '' },
      );
      if (decoded && decoded.id) {
        const user: User = await this.userRepository.findOne({
          where: { id: decoded.id },
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      }
      return undefined;
    } catch (err) {
      return err.message;
    }
  }

  async searchUsers(term: string): Promise<string | User[]> {
    try {
      const foundUsers = await this.userRepository.find({
        where: {
          nickname: ILike(`%${term}%`),
        },
      });
      if (!foundUsers) return 'no Users with the nickname';
      return foundUsers;
    } catch (err) {
      return err.message;
    }
  }
}
