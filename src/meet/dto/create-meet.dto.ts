import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMeetInput {
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
  category: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  period?: string;

  @Field({ nullable: true })
  location?: string;

  @Field()
  maximum: string;

  @IsNotEmpty()
  @Field(() => Int)
  OwnerId: number;
}
