import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { DmService } from './dm.service';
import { CreateDmInput } from './dto/create-dm.input';
import { DmReturn } from './dto/dm-return.dto';
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
    if (typeof res !== 'string')
      pubSub.publish('dmSubscription', { dmSubscription: res });
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
