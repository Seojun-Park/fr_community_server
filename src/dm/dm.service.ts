import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSubEngine, withFilter } from 'graphql-subscriptions';
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

  async dmSubscription(chatId: number): Promise<any> {
    try {
      const chat = await this.chatRepository.findOne({
        where: {
          id: chatId,
        },
      });
      if (!chat) return 'no Chat found';
      return await this.pubSub.asyncIterator('dmSubscription');
    } catch (err) {
      return err.message;
    }
  }

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
      if (ChatId) {
        dm.ChatId = ChatId;
      } else {
        const newChat = new Chat();
        newChat.Members = [];
        newChat.Members.push(sender);
        newChat.Members.push(receiver);
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
}
