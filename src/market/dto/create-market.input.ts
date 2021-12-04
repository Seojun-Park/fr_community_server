import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMarketInput {
  @IsNotEmpty()
  @Field(() => Int)
  UserId: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  content: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  price: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  type: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  status: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  location: string;

  @Field(() => [String], { nullable: true })
  images?: string[] | null;
}
