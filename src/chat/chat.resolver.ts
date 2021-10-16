import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { ChatReturn, ChatsReturn } from './dto/chat-return.dto';
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from './entity/chat.entity';
@Resolver((of) => Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

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
    @Args('userID', { type: () => Int }) userId: number,
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
