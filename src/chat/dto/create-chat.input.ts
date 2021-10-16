import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  SenderId: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  ReceiverId: number;
}
