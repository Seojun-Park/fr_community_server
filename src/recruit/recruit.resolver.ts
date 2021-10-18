import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { CreateRecruitInput } from './dto/create-recruit.input';
import { EditRecruitInput } from './dto/edit-recruit.input';
import { RecruitReturn, RecruitsReturn } from './dto/recruit-return.dto';
import { Recruit } from './entity/recruit.entity';
import { RecruitService } from './recruit.service';

@Resolver((of) => Recruit)
export class RecruitResolver {
  constructor(private readonly recruitService: RecruitService) {}

  @Query((returns) => RecruitReturn)
  async getRecruit(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<RecruitReturn> {
    const res = await this.recruitService.getRecruit(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => RecruitsReturn)
  async getRecruits(): Promise<RecruitsReturn> {
    const res = await this.recruitService.getRecruits();
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => RecruitReturn)
  async createRecruit(
    @Args('args', { type: () => CreateRecruitInput }) args: CreateRecruitInput,
  ): Promise<RecruitReturn> {
    const res = await this.recruitService.createRecruit(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => RecruitReturn)
  async editRecruit(
    @Args('args', { type: () => EditRecruitInput }) args: EditRecruitInput,
  ): Promise<RecruitReturn> {
    const res = await this.recruitService.editRecruit(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => RecruitReturn)
  async deleteRecruit(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean | string> {
    return await this.recruitService.deleteRecruit(id);
  }
}
