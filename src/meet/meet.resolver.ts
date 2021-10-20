import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { CreateMeetInput } from './dto/create-meet.dto';
import { EditMeetInput } from './dto/edit-meet.dto';
import { MeetReturn, MeetsReturn } from './dto/meet-return.dto';
import { Meet } from './entity/meet.entity';
import { MeetService } from './meet.service';

@Resolver((of) => Meet)
export class MeetResolver {
  constructor(private readonly meetService: MeetService) {}

  @Query((returns) => MeetReturn)
  async getMeet(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MeetReturn> {
    const res = await this.meetService.getMeet(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => MeetsReturn)
  async getMeets(): Promise<MeetsReturn> {
    const res = await this.meetService.getMeets();
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((retuns) => MeetReturn)
  async createMeet(
    @Args('args', { type: () => CreateMeetInput }) args: CreateMeetInput,
  ): Promise<MeetReturn> {
    const res = await this.meetService.createMeet(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => MeetReturn)
  async editMeet(
    @Args('args', { type: () => EditMeetInput }) args: EditMeetInput,
  ): Promise<MeetReturn> {
    const res = await this.meetService.editMeet(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => Boolean || String)
  async deleteMeet(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean | string> {
    return await this.meetService.deleteMeet(id);
  }

  @Mutation((returns) => Boolean || String)
  async joinMeet(
    @Args('MeetId', { type: () => Int }) MeetId: number,
    @Args('UserId', { type: () => Int }) UserId: number,
  ): Promise<boolean | string> {
    return await this.meetService.joinMeet(MeetId, UserId);
  }

  @Mutation((returns) => Boolean || String)
  async exitMeet(
    @Args('MeetId', { type: () => Int }) MeetId: number,
    @Args('UserId', { type: () => Int }) UserId: number,
  ): Promise<boolean | string> {
    return await this.meetService.exitMeet(MeetId, UserId);
  }

  @Mutation((returns) => Boolean || String)
  async kickUserFromMeet(
    @Args('MeetId', { type: () => Int }) MeetId: number,
    @Args('TargetId', { type: () => Int }) TargetId: number,
    @Args('OwnerId', { type: () => Int }) OwnerId: number,
  ): Promise<boolean | string> {
    return await this.meetService.kickUserFromMeet(MeetId, TargetId, OwnerId);
  }
}
