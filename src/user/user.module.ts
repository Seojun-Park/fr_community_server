import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Board } from '../board/entity/board.entity';
import { Market } from '../market/entity/market.entity';
import { Rent } from '../rent/entity/rent.entity';
import { Chat } from '../chat/entity/chat.entity';
import { Dm } from '../dm/entity/dm.entity';
import { Reply } from '../reply/entity/reply.entity';
import { Meet } from '../meet/entity/meet.entity';
import { MeetMember } from '../meet/entity/meetMember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Board,
      Market,
      Rent,
      Chat,
      Dm,
      Reply,
      Meet,
      MeetMember,
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
