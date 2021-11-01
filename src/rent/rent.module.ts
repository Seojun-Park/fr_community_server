import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentResolver } from './rent.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entity/rent.entity';
import { User } from '../user/entity/user.entity';
import { Image } from '../image/entity/image.entity';
import { Like } from '../like/entity/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, Image, User, Like])],
  providers: [RentService, RentResolver],
  exports: [RentService],
})
export class RentModule {}
