import { Module } from '@nestjs/common';
import { MeetService } from './meet.service';
import { MeetResolver } from './meet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meet } from './entity/meet.entity';
import { MeetMember } from './entity/meetMember.entity';
import { Like } from '../like/entity/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meet, MeetMember, Like])],
  providers: [MeetService, MeetResolver],
  exports: [MeetService],
})
export class MeetModule {}
