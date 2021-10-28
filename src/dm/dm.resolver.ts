import {
  Args,
  Int,
  Query,
  Mutation,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { DmService } from './dm.service';
import { CreateDmInput } from './dto/create-dm.input';
import { DmReturn, DmsReturn } from './dto/dm-return.dto';
import { Dm } from './entity/dm.entity';

const pubSub = new PubSub();
@Resolver((of) => Dm)
export class DmResolver {
  constructor(private dmService: DmService) {}

  @Subscription((returns) => Dm)
  dmSubscription() {
    return pubSub.asyncIterator('dmSubscription');
  }

  @Mutation((returns) => DmReturn)
  async sendDm(
    @Args('args', { type: () => CreateDmInput }) args: CreateDmInput,
  ): Promise<DmReturn> {
    const res = await this.dmService.sendDm(args);
    if (typeof res !== 'string') {
      pubSub.publish('dmSubscription', { dmSubscription: { ...res } });
    }
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => DmsReturn)
  async getChatMessages(
    @Args('ChatId', { type: () => Int }) ChatId: number,
  ): Promise<DmsReturn> {
    const res = await this.dmService.getChatMessages(ChatId);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
