import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserReturn, UsersReturn } from './dto/user-return.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserReturn)
  async getUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserReturn> {
    const res = await this.userService.findOne(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => UsersReturn)
  async getUsers(): Promise<UsersReturn> {
    const res = await this.userService.findAll();
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => UserReturn)
  async createUser(
    @Args('args', { type: () => CreateUserInput }) args: CreateUserInput,
  ): Promise<UserReturn> {
    const res = await this.userService.createUser(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
