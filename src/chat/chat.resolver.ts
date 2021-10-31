import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Dm } from '../dm/entity/dm.entity';
import { ChatService } from './chat.service';
import { ChatOutReturn, ChatReturn, ChatsReturn } from './dto/chat-return.dto';
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from './entity/chat.entity';

const pubSub = new PubSub();
@Resolver((of) => Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Subscription((returns) => ChatOutReturn, {
    filter: (payload, variables) => {
      console.log(payload, variables);
      return payload.memberOut.chatId === variables.chatId;
    },
  })
  memberOut(@Args('chatId', { type: () => Int }) chatId: number) {
    return pubSub.asyncIterator('memberOut');
  }

  @Subscription((returns) => Dm, {
    filter: (payload, variables) => {
      return (
        payload.getDm.ReceiverId === variables.userId ||
        payload.getDm.SenderId === variables.userId
      );
    },
  })
  getDm(@Args('userId', { type: () => Int }) userId: number) {
    return pubSub.asyncIterator('getDm');
  }

  @Query((returns) => ChatReturn)
  async getChat(
    @Args('chatId', { type: () => Int }) chatId: number,
  ): Promise<ChatReturn> {
    const res = await this.chatService.getChat(chatId);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => ChatsReturn)
  async getChats(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ChatsReturn> {
    const res = await this.chatService.getChats(userId);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => ChatReturn)
  async checkChatMember(
    @Args('chatId', { type: () => Int }) chatId: number,
  ): Promise<ChatReturn> {
    const res = await this.chatService.checkChatMember(chatId);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => ChatReturn)
  async createChat(
    @Args('args', { type: () => CreateChatInput }) args: CreateChatInput,
  ): Promise<ChatReturn> {
    const res = await this.chatService.createChat(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => ChatReturn)
  async outChat(
    @Args('chatId', { type: () => Int }) chatId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ChatReturn> {
    const res = await this.chatService.outChat(chatId, userId);
    if (typeof res !== 'string') {
      pubSub.publish('memberOut', {
        memberOut: {
          chatId: chatId,
          userId: userId,
        },
      });
    }
    return {
      success:
        typeof res === 'string'
          ? res === 'Chat deleted'
            ? true
            : false
          : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
