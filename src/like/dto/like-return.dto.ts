import { Field, ObjectType } from '@nestjs/graphql';
import { Like } from '../entity/like.entity';

@ObjectType()
export class LikeReturn {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String || Error, { nullable: true })
  error?: string | null;

  @Field(() => Like, { nullable: true })
  data?: Like | null;
}
