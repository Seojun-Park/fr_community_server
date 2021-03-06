import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSubEngine } from 'graphql-subscriptions';
import { Repository } from 'typeorm';
import { Chat } from '../chat/entity/chat.entity';
import { User } from '../user/entity/user.entity';
import { CreateDmInput } from './dto/create-dm.input';
import { Dm } from './entity/dm.entity';

@Injectable()
export class DmService {
  constructor(
    @InjectRepository(Dm) private dmRepository: Repository<Dm>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  async sendDm(args: CreateDmInput): Promise<Dm | string> {
    try {
      const { SenderId, ReceiverId, content, ChatId } = args;
      const sender = await this.userRepository.findOne({
        where: { id: SenderId },
      });
      const receiver = await this.userRepository.findOne({
        where: { id: ReceiverId },
      });
      if (!sender) return `No found User id ${SenderId} (sender)`;
      if (!receiver) return `No found User id ${ReceiverId} (receiver)`;
      const dm = await this.dmRepository.create({
        content,
      });
      const existedChat = await this.chatRepository.findOne({
        where: [
          { Member1: SenderId, Member2: ReceiverId },
          { Member1: ReceiverId, Member2: SenderId },
        ],
      });
      if (ChatId) {
        dm.ChatId = ChatId;
      } else if (existedChat) {
        dm.ChatId = existedChat.id;
      } else {
        const newChat = new Chat();
        newChat.Members = [];
        newChat.Members.push(sender);
        newChat.Members.push(receiver);
        newChat.Member1 = SenderId;
        newChat.Member2 = ReceiverId;
        const savedChat = await this.chatRepository.save(newChat);
        dm.ChatId = savedChat.id;
      }
      dm.ReceiverId = ReceiverId;
      dm.SenderId = SenderId;
      const savedDm = await this.dmRepository.save(dm);
      return savedDm;
    } catch (err) {
      return err.message;
    }
  }

  async getChatMessages(ChatId: number, load: number): Promise<Dm[] | string> {
    try {
      const msgs = await this.dmRepository.find({
        where: { ChatId },
        relations: ['Sender', 'Receiver'],
        take: load * 10 + 1,
        order: {
          createdAt: 'DESC',
        },
      });
      if (!msgs) {
        return 'no Messages found';
      }
      return msgs.reverse();
    } catch (err) {
      return err.message;
    }
  }
}
