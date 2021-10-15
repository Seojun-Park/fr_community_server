import { Field, ObjectType } from '@nestjs/graphql';
import { Market } from '../entity/market.entity';

@ObjectType()
export class MarketReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => Market, { nullable: true })
  data?: Market | null;
}

@ObjectType()
export class MarketsReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [Market], { nullable: true })
  data?: Market[] | null;
}
