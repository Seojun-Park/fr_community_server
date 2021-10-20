import { Field, ObjectType } from '@nestjs/graphql';
import { Meet } from '../entity/meet.entity';

@ObjectType()
export class MeetReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => Meet, { nullable: true })
  data?: Meet | null;
}

@ObjectType()
export class MeetsReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [Meet], { nullable: true })
  data?: Meet[] | null;
}
