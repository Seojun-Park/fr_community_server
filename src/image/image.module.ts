import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { Market } from '../market/entity/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Market])],
  providers: [ImageService, ImageResolver],
  exports: [ImageService, ImageResolver],
})
export class ImageModule {}
