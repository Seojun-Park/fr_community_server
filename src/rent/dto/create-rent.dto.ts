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
  @IsBoolean()
  @Field(() => Boolean)
  commission: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  guarantor: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  UserId: number;

  @IsArray()
  @Field(() => [String], { nullable: true })
  images: string[];
}
