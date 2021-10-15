import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketResolver } from './market.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './entity/market.entity';
import { User } from '../user/entity/user.entity';
import { Image } from '../image/entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Market, User, Image])],
  providers: [MarketService, MarketResolver],
  exports: [MarketService, MarketResolver],
})
export class MarketModule {}
