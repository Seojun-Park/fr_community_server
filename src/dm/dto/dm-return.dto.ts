import { Field, ObjectType } from '@nestjs/graphql';
import { Dm } from '../entity/dm.entity';

@ObjectType()
export class DmReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => Dm, { nullable: true })
  data?: Dm | null;
}

@ObjectType()
export class DmsReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [Dm], { nullable: true })
  data?: Dm[] | null;
}
