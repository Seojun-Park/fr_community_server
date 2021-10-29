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
import { ChatReturn, ChatsReturn } from './dto/chat-return.dto';
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from './entity/chat.entity';

const pubSub = new PubSub();
@Resolver((of) => Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Subscription((returns) => Int, {
    filter: (payload, variables) => {
      return payload.memberOut.chatId === variables.chatId;
    },
  })
  memberOut(@Args('chatId', { type: () => Int }) chatId: number) {
    return pubSub.asyncIterator('memberOut');
  }

  @Subscription((returns) => Int)
  getDm() {
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
