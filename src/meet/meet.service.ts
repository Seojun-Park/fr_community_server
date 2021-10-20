import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetInput } from './dto/create-meet.dto';
import { EditMeetInput } from './dto/edit-meet.dto';
import { Meet } from './entity/meet.entity';
import { MeetMember } from './entity/meetMember.entity';

@Injectable()
export class MeetService {
  constructor(
    @InjectRepository(Meet) private meetRepository: Repository<Meet>,
    @InjectRepository(MeetMember)
    private meetMemberRepository: Repository<MeetMember>,
  ) {}

  async getMeet(id: number): Promise<Meet | string> {
    try {
      const meet = await this.meetRepository.findOne({
        where: { id },
        relations: ['Owner', 'MeetMember'],
      });
      if (!meet) return 'no Meet found';
      return meet;
    } catch (err) {
      return err.message;
    }
  }

  async getMeets(): Promise<Meet[] | string> {
    try {
      const meets = await this.meetRepository.find({
        order: { createdAt: 'DESC' },
        relations: ['MeetMember'],
      });
      if (!meets) return 'no Meets found';
      return meets;
    } catch (err) {
      return err.message;
    }
  }

  async createMeet(args: CreateMeetInput): Promise<Meet | string> {
    try {
      const {
        category,
        title,
        content,
        price,
        period,
        location,
        maximum,
        OwnerId,
      } = args;
      const meet = new Meet();
      meet.title = title;
      meet.content = content;
      meet.category = category;
      meet.OwnerId = OwnerId;
      meet.price = price;
      meet.period = period;
      meet.location = location;
      meet.maximum = maximum;
      const savedMeet = await this.meetRepository.save(meet);
      const meetMember = new MeetMember();
      meetMember.MeetId = savedMeet.id;
      meetMember.UserId = OwnerId;
      await this.meetMemberRepository.save(meetMember);
      return await this.meetRepository.save(meet);
    } catch (err) {
      return err.message;
    }
  }

  async editMeet(args: EditMeetInput): Promise<Meet | string> {
    try {
      const { id, title, content, price, period, location, maximum } = args;
      const meet = await this.meetRepository.findOne({ where: { id } });
      if (!meet) return 'no Meet found';
      const prevValue: {
        title: string;
        content: string;
        price: string | null;
        period: string | null;
        location: string | null;
        maximun: string;
      } = {
        title: meet.title,
        content: meet.content,
        price: meet.price,
        period: meet.period,
        location: meet.location,
        maximun: meet.maximum,
      };
      meet.title = title || prevValue.title;
      meet.content = content || prevValue.content;
      meet.price = price || prevValue.price;
      meet.period = period || prevValue.period;
      meet.location = location || prevValue.location;
      meet.maximum = maximum || prevValue.maximun;
      return await this.meetRepository.save(meet);
    } catch (err) {
      return err.message;
    }
  }

  async deleteMeet(id: number): Promise<boolean | string> {
    try {
      await this.meetRepository.delete({ id });
      return true;
    } catch (err) {
      return err.message;
    }
  }

  async joinMeet(MeetId: number, UserId: number): Promise<boolean | string> {
    try {
      const meetMember = new MeetMember();
      meetMember.MeetId = MeetId;
      meetMember.UserId = UserId;
      await this.meetMemberRepository.save(meetMember);
      return true;
    } catch (err) {
      return err.message;
    }
  }

  async exitMeet(MeetId: number, UserId: number): Promise<boolean | string> {
    try {
      const member = await this.meetMemberRepository.findOne({
        where: { MeetId, UserId },
      });
      if (!member) return 'You are not participant of this meet';
      await this.meetMemberRepository.remove(member);
      return true;
    } catch (err) {
      return err.message;
    }
  }

  async kickUserFromMeet(
    MeetId: number,
    TargetId: number,
    OwnerId: number,
  ): Promise<boolean | string> {
    try {
      const meet = await this.meetRepository.findOne({ where: { id: MeetId } });
      if (!meet) return 'no Meet found';
      if (meet.OwnerId !== OwnerId)
        return 'You are not the owner of this meeting';
      const member = await this.meetMemberRepository.findOne({
        where: { MeetId, UserId: TargetId },
      });
      if (!member) return "Target user doesn't existed";
      await this.meetMemberRepository.remove(member);
      return true;
    } catch (err) {
      return err.message;
    }
  }
}
