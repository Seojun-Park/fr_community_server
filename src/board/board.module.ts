import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { User } from '../user/entity/user.entity';
import { Reply } from '../reply/entity/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User, Reply])],
  providers: [BoardService, BoardResolver],
  exports: [BoardService, BoardResolver],
})
export class BoardModule {}
