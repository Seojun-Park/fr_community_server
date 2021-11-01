import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { User } from '../user/entity/user.entity';
import { Reply } from '../reply/entity/reply.entity';
import { Image } from '../image/entity/image.entity';
import { Like } from '../like/entity/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User, Reply, Image, Like])],
  providers: [BoardService, BoardResolver],
})
export class BoardModule {}
