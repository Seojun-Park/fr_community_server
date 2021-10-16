import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CreateReplyInput } from './dto/create-reply.input';
import { EditReplyInput } from './dto/edit-reply.input';
import { ReplyReturn } from './dto/reply-return.dto';
import { Reply } from './entity/reply.entity';
import { ReplyService } from './reply.service';

@Resolver((of) => Reply)
export class ReplyResolver {
  constructor(private readonly replyService: ReplyService) {}

  @Mutation((returns) => ReplyReturn)
  async createReply(
    @Args('args', { type: () => CreateReplyInput }) args: CreateReplyInput,
  ): Promise<ReplyReturn> {
    const res = await this.replyService.createReply(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => ReplyReturn)
  async editReply(
    @Args('args', { type: () => EditReplyInput }) args: EditReplyInput,
  ): Promise<ReplyReturn> {
    const res = await this.replyService.editReply(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => Boolean || String)
  async deleteReply(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean | string> {
    return await this.replyService.deleteReply(id);
  }
}
