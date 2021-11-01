import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitResolver } from './recruit.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Recruit } from './entity/recruit.entity';
import { Like } from '../like/entity/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Recruit, Like])],
  providers: [RecruitService, RecruitResolver],
})
export class RecruitModule {}
