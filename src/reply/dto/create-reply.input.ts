import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateReplyInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  BoardId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  UserId: number;

  @IsString()
  @Field()
  content: string;
}
