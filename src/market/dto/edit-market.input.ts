import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class EditMarketInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  MarketId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  status?: string;
}
