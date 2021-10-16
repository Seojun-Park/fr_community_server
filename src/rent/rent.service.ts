import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../image/entity/image.entity';
import { CreateRentInput } from './dto/create-rent.dto';
import { EditRentInput } from './dto/edit-rent.dto';
import { Rent } from './entity/rent.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent) private rentRepository: Repository<Rent>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async getRent(id: number): Promise<Rent | string> {
    try {
      const rent = await this.rentRepository.findOne({
        where: { id },
        relations: ['images', 'User'],
      });
      if (!rent) return 'no Rent found';
      return rent;
    } catch (err) {
      return err.message;
    }
  }

  async getRents(): Promise<Rent[] | string> {
    try {
      const res: Rent[] = await this.rentRepository.find({
        order: { createdAt: 'DESC' },
      });
      return res;
    } catch (err) {
      return err.message;
    }
  }

  async createRent(args: CreateRentInput): Promise<Rent | string> {
    try {
      const {
        title,
        content,
        commission,
        price,
        deposit,
        type,
        square,
        address,
        guarantor,
        UserId,
        images,
      } = args;
      const rent = new Rent();
      rent.title = title;
      rent.content = content;
      rent.commission = commission;
      rent.price = price;
      rent.deposit = deposit;
      rent.type = type;
      rent.square = square;
      rent.address = address;
      rent.guarantor = guarantor;
      rent.UserId = UserId;
      rent.thumbnail = images ? images[0] : null;
      const savedRent = await this.rentRepository.save(rent);
      if (images) {
        for (let i = 0; i < images.length; i++) {
          const newImage = new Image();
          newImage.url = images[i];
          newImage.RentId = savedRent.id;

          await this.imageRepository.save(newImage);
        }
      }
      return savedRent;
    } catch (err) {
      return err.message;
    }
  }

  async editRent(args: EditRentInput): Promise<Rent | string> {
    try {
      const {
        RentId,
        title,
        content,
        price,
        deposit,
        type,
        square,
        address,
        option,
        commission,
        guarantor,
      } = args;
      const rent = await this.rentRepository.findOne({ where: { id: RentId } });
      if (!rent) return 'no Rent Found';
      const prevValue: {
        title: string;
        content: string;
        price: string;
        deposit: string;
        type: string;
        square: string;
        address: string;
        option: string;
        commission: boolean;
        guarantor: boolean;
      } = {
        title: rent.title,
        content: rent.content,
        price: rent.price,
        deposit: rent.deposit,
        type: rent.type,
        square: rent.square,
        address: rent.address,
        option: rent.option,
        commission: rent.commission,
        guarantor: rent.guarantor,
      };
      rent.title = title || prevValue.title;
      rent.content = content || prevValue.content;
      rent.price = price || prevValue.price;
      rent.deposit = deposit || prevValue.deposit;
      rent.type = type || prevValue.type;
      rent.square = square || prevValue.square;
      rent.address = address || prevValue.address;
      rent.option = option || prevValue.option;
      rent.commission = commission || prevValue.commission;
      rent.guarantor = guarantor || prevValue.guarantor;
      const savedRent = await this.rentRepository.save(rent);
      return savedRent;
    } catch (err) {
      return err.message;
    }
  }

  async deleteRent(id: number): Promise<boolean | string> {
    try {
      await this.rentRepository.delete({ id });
      return true;
    } catch (err) {
      return err.message;
    }
  }
}
