import { Field, ObjectType } from '@nestjs/graphql';
import { Reply } from '../entity/reply.entity';

@ObjectType()
export class ReplyReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => Reply, { nullable: true })
  data?: Reply | null;
}

@ObjectType()
export class ReplysReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [Reply], { nullable: true })
  data?: Reply[] | null;
}
