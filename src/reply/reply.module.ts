import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyResolver } from './reply.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entity/reply.entity';
import { Board } from '../board/entity/board.entity';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Board, User])],
  providers: [ReplyService, ReplyResolver],
  exports: [ReplyService],
})
export class ReplyModule {}
