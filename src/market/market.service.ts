import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../image/entity/image.entity';
import { CreateMarketInput } from './dto/create-market.input';
import { EditMarketInput } from './dto/edit-market.input';
import { Market } from './entity/market.entity';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market) private marketRepository: Repository<Market>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async getMarket(id: number): Promise<Market | string> {
    try {
      const res = await this.marketRepository.findOne({
        where: { id },
        relations: ['User'],
      });
      return res;
    } catch (err) {
      return err.message;
    }
  }

  async getMarkets(): Promise<Market[] | string> {
    try {
      const res = await this.marketRepository.find({
        order: { createdAt: 'DESC' },
        relations: ['User'],
      });
      return res;
    } catch (err) {
      return err.message;
    }
  }

  async createMarket(args: CreateMarketInput) {
    try {
      const { UserId, title, content, price, location, images, status } = args;
      const market = new Market();
      market.UserId = UserId;
      market.title = title;
      market.content = content;
      market.price = price;
      market.location = location;
      market.status = status;
      const savedMarket = await this.marketRepository.save(market);
      if (images) {
        for (let i = 0; i < images.length; i++) {
          const newImages = new Image();
          newImages.url = images[i];
          newImages.MarketId = savedMarket.id;
          await this.imageRepository.save(newImages);
        }
      }
      return savedMarket;
    } catch (err) {
      return err.message;
    }
  }

  async editMarket(args: EditMarketInput) {
    try {
      const { MarketId, title, content, price, location, status } = args;
      const market = await this.marketRepository.findOne({
        where: { id: MarketId },
      });
      if (!market) return `Market not found with this id #${MarketId}`;
      const prevValue: {
        title: string;
        content: string;
        price: string;
        location: string;
        status: string;
      } = {
        title: market.title,
        content: market.content,
        price: market.price,
        location: market.location,
        status: market.status,
      };
      market.title = title || prevValue.title;
      market.content = content || prevValue.content;
      market.price = price || prevValue.price;
      market.location = location || prevValue.location;
      market.status = location || prevValue.status;
      const savedMarket = await this.marketRepository.save(market);
      return savedMarket;
    } catch (err) {
      return err.message;
    }
  }

  async deleteMarket(id: number): Promise<boolean | string> {
    try {
      await this.marketRepository.delete({ id });
      return true;
    } catch (err) {
      return err.message;
    }
  }
}
