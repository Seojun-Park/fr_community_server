import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decodeToken(token: string) {
    const decoded: any = this.jwtService.verify(
      token.includes(' ') ? token.split(' ')[1] : token,
      { secret: process.env.JWT_SECRET || '' },
    );
    if (decoded && decoded.id) {
      const user: User = await this.usersRepository.findOne({
        where: { id: decoded.id },
        relations: ['Rent'],
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    }
    return undefined;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'verified', 'verifiedCode'],
    });
    if (!user) return 'no User found';
    const check = await bcrypt.compare(password, user.password);
    if (check) {
      return await this.jwtService.sign(
        { id: user.id },
        { secret: process.env.JWT_SECRET || '' },
      );
    } else {
      return null;
    }
  }
}
