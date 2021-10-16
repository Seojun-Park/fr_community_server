import { Field, ObjectType } from '@nestjs/graphql';
import { Rent } from '../entity/rent.entity';

@ObjectType()
export class RentReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => Rent, { nullable: true })
  data?: Rent | null;
}

@ObjectType()
export class RentsReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [Rent], { nullable: true })
  data?: Rent[] | null;
}
