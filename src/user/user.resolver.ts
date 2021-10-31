import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
import { TokenReturn, UserReturn, UsersReturn } from './dto/user-return.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

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

  @Query((returns) => UserReturn)
  async getUserByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<UserReturn> {
    const res = await this.userService.getUserByEmail(email);
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
  async verifyEmail(
    @Args('email', { type: () => String }) email: string,
    @Args('code', { type: () => String }) code: string,
  ): Promise<UserReturn> {
    const res = await this.userService.verifyEmail(email, code);
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

  @Mutation((returns) => TokenReturn)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<TokenReturn> {
    const res = await this.authService.validateUser(email, password);
    return {
      success:
        typeof res === 'string' && res !== 'no User found' ? true : false,
      error: typeof res === 'string' ? res : 'Wrong password',
      token: typeof res === 'string' ? res : null,
    };
  }

  @Query((returns) => UserReturn)
  async getMe(
    @Args('token', { type: () => String }) token: string,
  ): Promise<UserReturn> {
    const res = await this.userService.getMe(token);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => UserReturn)
  async sendNewCode(
    @Args('email', { type: () => String }) email: string,
  ): Promise<UserReturn> {
    const res = await this.userService.sendNewCode(email);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => UserReturn)
  async sendNewPassword(
    @Args('email', { type: () => String }) email: string,
    @Args('firstName', { type: () => String }) firstName: string,
    @Args('lastName', { type: () => String }) lastName: string,
  ): Promise<UserReturn> {
    const res = await this.userService.sendNewPassword(
      email,
      firstName,
      lastName,
    );
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => UsersReturn)
  async searchUsers(
    @Args('term', { type: () => String }) term: string,
  ): Promise<UsersReturn> {
    const res = await this.userService.searchUsers(term);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
