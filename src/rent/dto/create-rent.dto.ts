import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateRentInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  price: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  deposit: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  type: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  square: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  heatType: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  term: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  option: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  allocation: boolean;

  @IsNotEmpty()
  @IsString()
  @Field()
  availableFrom: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  commission: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  guarantor: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  proof: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  UserId: number;

  @IsArray()
  @Field(() => [String], { nullable: true })
  images: string[];
}
