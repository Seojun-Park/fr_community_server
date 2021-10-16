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
}
