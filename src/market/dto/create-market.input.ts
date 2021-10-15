import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMarketInput {
  @IsNotEmpty()
  @Field(() => Int)
  UserId: number;

  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  content: string;

  @IsNotEmpty()
  @Field()
  price: string;

  @IsNotEmpty()
  @Field()
  status: string;

  @IsNotEmpty()
  @Field()
  location: string;

  @Field(() => [String], { nullable: true })
  images?: string[];
}
