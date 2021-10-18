import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecruitInput } from './dto/create-recruit.input';
import { EditRecruitInput } from './dto/edit-recruit.input';
import { Recruit } from './entity/recruit.entity';

@Injectable()
export class RecruitService {
  constructor(
    @InjectRepository(Recruit) private recruitRepository: Repository<Recruit>,
  ) {}

  async getRecruit(id: number): Promise<Recruit | string> {
    try {
      const recruit = await this.recruitRepository.findOne({
        where: { id },
        relations: ['Owner'],
      });
      if (!recruit) return 'no Recruit found';
      return recruit;
    } catch (err) {
      return err.message;
    }
  }

  async getRecruits(): Promise<Recruit[] | string> {
    try {
      const recruit = await this.recruitRepository.find({
        order: { createdAt: 'DESC' },
      });
      if (!recruit) return 'no Recruits found';
      return recruit;
    } catch (err) {
      return err.message;
    }
  }

  async createRecruit(args: CreateRecruitInput): Promise<Recruit | string> {
    try {
      const { title, content, location, salary, period, UserId, type } = args;
      const recruit = new Recruit();
      recruit.OwnerId = UserId;
      recruit.title = title;
      recruit.content = content;
      recruit.location = location;
      recruit.period = period;
      recruit.salary = salary;
      recruit.type = type;
      return await this.recruitRepository.save(recruit);
    } catch (err) {
      return err.message;
    }
  }

  async editRecruit(args: EditRecruitInput): Promise<Recruit | string> {
    try {
      const { RecruitId, title, content, location, period, salary, type } =
        args;
      const recruit = await this.recruitRepository.findOne({
        where: { id: RecruitId },
        relations: ['Owner'],
      });
      if (!recruit) return 'no Recruit found';
      const prevValue: {
        title: string;
        content: string;
        location: string;
        period: string;
        salary: string;
        type: string;
      } = {
        title: recruit.title,
        content: recruit.content,
        location: recruit.location,
        period: recruit.period,
        salary: recruit.salary,
        type: recruit.type,
      };
      recruit.title = title || prevValue.title;
      recruit.content = content || prevValue.content;
      recruit.location = location || prevValue.location;
      recruit.period = period || prevValue.period;
      recruit.salary = salary || prevValue.salary;
      recruit.type = type || prevValue.type;
      return await this.recruitRepository.save(recruit);
    } catch (err) {
      return err.message;
    }
  }

  async deleteRecruit(id: number): Promise<boolean | string> {
    try {
      await this.recruitRepository.delete({ id });
    } catch (err) {
      return err.message;
    }
  }
}
