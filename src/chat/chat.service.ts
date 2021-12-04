import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dm } from '../dm/entity/dm.entity';
import { User } from '../user/entity/user.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from './entity/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Dm) private dmRepository: Repository<Dm>,
  ) {}

  async getChat(chatId: number): Promise<Chat | string> {
    try {
      const chat = await this.chatRepository.findOne({
        where: { id: chatId },
        relations: [
          'Members',
          'messages',
          'messages.Sender',
          'messages.Receiver',
        ],
      });
      if (!chat) return `no chat found for the id #${chatId}`;
      return chat;
    } catch (err) {
      return err.message;
    }
  }

  async checkChatMember(chatId: number): Promise<Chat | string> {
    try {
      const chat = await this.chatRepository.findOne({
        where: { id: chatId },
      });
      if (!chat) return 'Fail to check chat member';
      return chat;
    } catch (err) {
      return err.message;
    }
  }

  async getChats(userId: number): Promise<Chat[] | string> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['Chats', 'Chats.messages'],
      });
      const chats = user.Chats;
      console.log(chats);
      return chats;
    } catch (err) {
      return err.message;
    }
  }

  async createChat(args: CreateChatInput): Promise<Chat | string> {
    try {
      const { SenderId, ReceiverId } = args;
      const sender = await this.userRepository.findOne({
        where: { id: SenderId },
      });
      const receiver = await this.userRepository.findOne({
        where: { id: ReceiverId },
      });
      const existedChat = await this.chatRepository.findOne({
        where: [
          { Member1: SenderId, Member2: ReceiverId },
          { Member1: ReceiverId, Member2: SenderId },
        ],
      });
      if (existedChat) {
        return existedChat;
      }
      if (!sender || !receiver)
        return `no ${!sender ? 'sender' : 'receiver'} found`;
      const chat = new Chat();
      chat.Members = [];
      chat.Members.push(sender);
      chat.Member1 = SenderId;
      chat.Member2 = ReceiverId;
      chat.Members.push(receiver);
      const savedChat = await this.chatRepository.save(chat);
      sender.Chats.filter((elem) => elem.id === savedChat.id);
      return savedChat;
    } catch (err) {
      return err.message;
    }
  }

  async outChat(chatId: number, userId: number): Promise<Chat | string> {
    try {
      const chat = await this.chatRepository.findOne({
        where: { id: chatId },
        relations: ['Members', 'messages'],
      });
      if (!chat) return 'No chat found';
      if (chat.messages) {
        const receivedMsgs = chat.messages.filter(
          (msg) => msg.ReceiverId === userId,
        );
        const sentMsgs = chat.messages.filter((msg) => msg.SenderId === userId);
        if (receivedMsgs) {
          await this.dmRepository.remove(receivedMsgs);
        } else {
          await this.dmRepository.remove(sentMsgs);
        }
      }
      chat.Members = chat.Members.filter((user) => user.id !== userId);
      if (chat.Member1 === userId) {
        chat.Member1 = null;
      } else {
        chat.Member2 = null;
      }
      if (chat.Members.length === 0) {
        chat.Members = null;
        await this.chatRepository.remove(chat);
        return 'Chat deleted';
      }
      const savedChat = await this.chatRepository.save(chat);
      return savedChat;
    } catch (err) {
      return err.message;
    }
  }
}
