import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class EditReplyInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  BoardId: number;

  @Field({ nullable: true })
  content?: string;
}
