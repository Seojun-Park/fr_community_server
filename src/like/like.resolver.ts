import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeReturn } from './dto/like-return.dto';
import { Like } from './entity/like.entity';
import { LikeService } from './like.service';

@Resolver((of) => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query((returns) => LikeReturn)
  async getLike(
    @Args('UserId', { type: () => Int }) UserId: number,
  ): Promise<LikeReturn> {
    const res = await this.likeService.getLike(UserId);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => LikeReturn)
  async toggleLike(
    @Args('Id', { type: () => Int }) Id: number,
    @Args('type', { type: () => String }) type: string,
    @Args('UserId', { type: () => Int }) UserId: number,
  ): Promise<LikeReturn> {
    const res = await this.likeService.toggleLike(Id, type, UserId);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
