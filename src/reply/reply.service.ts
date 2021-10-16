import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReplyInput } from './dto/create-reply.input';
import { EditReplyInput } from './dto/edit-reply.input';
import { Reply } from './entity/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private replyRepository: Repository<Reply>,
  ) {}

  async createReply(args: CreateReplyInput): Promise<Reply | string> {
    try {
      const { BoardId, UserId, content } = args;
      const reply = new Reply();
      reply.BoardId = BoardId;
      reply.UserId = UserId;
      reply.content = content;
      const savedReply = await this.replyRepository.save(reply);
      return savedReply;
    } catch (err) {
      return err.message;
    }
  }

  async editReply(args: EditReplyInput): Promise<Reply | string> {
    try {
      const { BoardId, content } = args;
      const reply = await this.replyRepository.findOne({ where: { BoardId } });
      if (!reply) return 'No reply found';
      const prevValue: string = reply.content;
      reply.content = content || prevValue;
      const savedReply = await this.replyRepository.save(reply);
      return savedReply;
    } catch (err) {
      return err.message;
    }
  }

  async deleteReply(id: number): Promise<boolean | string> {
    try {
      await this.replyRepository.delete({ id });
    } catch (err) {
      return err.message;
    }
  }
}
