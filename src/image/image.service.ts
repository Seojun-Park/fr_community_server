import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async deleteImage(id: number): Promise<boolean | string> {
    try {
      await this.imageRepository.delete({ id });
      return true;
    } catch (err) {
      return err.message;
    }
  }

  async addImage(
    id: number,
    type: string,
    url: string,
  ): Promise<Image | string> {
    try {
      const image = new Image();
      image.url = url;
      if (type === 'market') {
        image.MarketId = id;
      } else {
        image.RentId = id;
      }
      const savedImage = await this.imageRepository.save(image);
      return savedImage;
    } catch (err) {
      return err.message;
    }
  }
}
