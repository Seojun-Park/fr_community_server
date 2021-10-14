import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/user.entity';

@ObjectType()
export class UserReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => User, { nullable: true })
  data?: User | null;
}

@ObjectType()
export class UsersReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [User], { nullable: true })
  data?: User[] | null;
}
