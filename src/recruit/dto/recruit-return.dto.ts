import { Field, ObjectType } from '@nestjs/graphql';
import { Recruit } from '../entity/recruit.entity';

@ObjectType()
export class RecruitReturn {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String || Error, { nullable: true })
  error?: string | null;

  @Field(() => Recruit, { nullable: true })
  data?: Recruit | null;
}

@ObjectType()
export class RecruitsReturn {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String || Error, { nullable: true })
  error?: string | null;

  @Field(() => [Recruit], { nullable: true })
  data?: Recruit[] | null;
}
