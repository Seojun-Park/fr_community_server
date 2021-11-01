import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Like } from './entity/like.entity';
import { Board } from '../board/entity/board.entity';
import { Meet } from '../meet/entity/meet.entity';
import { Market } from '../market/entity/market.entity';
import { Recruit } from '../recruit/entity/recruit.entity';
import { Rent } from '../rent/entity/rent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Like, Board, Meet, Market, Recruit, Rent]),
  ],
  providers: [LikeService, LikeResolver],
  exports: [LikeService],
})
export class LikeModule {}
