import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
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
    const res = await this.userService.getUser(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => UsersReturn)
  async getUsers(): Promise<UsersReturn> {
    const res = await this.userService.getUsers();
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

  @Mutation((returns) => UserReturn)
  async editUser(
    @Args('args', { type: () => EditUserInput }) args: EditUserInput,
  ): Promise<UserReturn> {
    const res = await this.userService.editUser(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => UserReturn)
  async changePassword(
    @Args('id', { type: () => Int }) id: number,
    @Args('password') password: string,
    @Args('newPassword') newPassword: string,
  ): Promise<UserReturn> {
    const res = await this.userService.changePassword(
      id,
      password,
      newPassword,
    );
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
