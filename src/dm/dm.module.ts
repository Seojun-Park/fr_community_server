import { Module } from '@nestjs/common';
import { DmService } from './dm.service';
import { DmResolver } from './dm.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dm } from './entity/dm.entity';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dm, User])],
  providers: [DmService, DmResolver],
})
export class DmModule {}
