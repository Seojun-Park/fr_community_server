import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../board/entity/board.entity';
import { Market } from '../market/entity/market.entity';
import { Meet } from '../meet/entity/meet.entity';
import { Recruit } from '../recruit/entity/recruit.entity';
import { Rent } from '../rent/entity/rent.entity';
import { User } from '../user/entity/user.entity';
import { Like } from './entity/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Market) private marketRepository: Repository<Market>,
    @InjectRepository(Recruit) private recruitRepository: Repository<Recruit>,
    @InjectRepository(Rent) private rentRepository: Repository<Rent>,
    @InjectRepository(Meet) private meetRepository: Repository<Meet>,
  ) {}

  async getLike(UserId: number): Promise<Like | string> {
    try {
      const like = await this.likeRepository.findOne({
        where: { OwnerId: UserId },
      });
      if (!like) return 'no Like found';
      return like;
    } catch (err) {
      return err.message;
    }
  }

  async toggleLike(
    Id: number,
    type: string,
    UserId: number,
  ): Promise<Like | string> {
    try {
      let model;
      switch (type) {
        case 'board':
          model = await this.boardRepository.findOne({ where: { id: Id } });
          break;
        case 'market':
          model = await this.marketRepository.findOne({ where: { id: Id } });
          break;
        case 'recruit':
          model = await this.recruitRepository.findOne({ where: { id: Id } });
          break;
        case 'rent':
          model = await this.rentRepository.findOne({ where: { id: Id } });
          break;
        case 'meet':
          model = await this.meetRepository.findOne({ where: { id: Id } });
          break;
        default:
          return 'no type is provided';
      }
      if (!model) return 'no Model found';
      const user = await this.userRepository.findOne({ where: { id: UserId } });
      const like = await this.likeRepository.findOne({
        where: { OwnerId: UserId },
      });
      if (!user) return 'no User found';
      if (!like) return 'no Like found';
      switch (type) {
        case 'board':
          if (like.Boards.find((v) => v.id === Id)) {
            like.Boards.filter((v) => v.id !== Id);
          } else {
            like.Boards.push(model);
          }
          break;
        case 'market':
          if (like.Markets.find((v) => v.id === Id)) {
            like.Markets.filter((v) => v.id !== Id);
          } else {
            like.Markets.push(model);
          }
          break;
        case 'recruit':
          if (like.Recruits.find((v) => v.id === Id)) {
            like.Recruits.filter((v) => v.id !== Id);
          } else {
            like.Recruits.push(model);
          }
          break;
        case 'rent':
          if (like.Rents.find((v) => v.id === Id)) {
            like.Rents.filter((v) => v.id !== Id);
          } else {
            like.Rents.push(model);
          }
          break;
        case 'meet':
          if (like.Meets.find((v) => v.id === Id)) {
            like.Meets.filter((v) => v.id !== Id);
          } else {
            like.Meets.push(model);
          }
          break;
        default:
          return 'Fail to add like';
      }
      return await this.likeRepository.save(like);
    } catch (err) {
      return err.message;
    }
  }
}
