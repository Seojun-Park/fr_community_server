import { Module } from '@nestjs/common';
import { DmService } from './dm.service';
import { DmResolver } from './dm.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dm } from './entity/dm.entity';
import { User } from '../user/entity/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { Chat } from '../chat/entity/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dm, User, Chat])],
  providers: [
    DmService,
    DmResolver,
    { provide: 'PUB_SUB', useValue: new PubSub() },
  ],
})
export class DmModule {}
