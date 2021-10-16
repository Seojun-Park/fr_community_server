import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateDmInput {
  @IsNotEmpty()
  @Field()
  content: string;

  @Field(() => Int, { nullable: true })
  ChatId?: number;

  @Field(() => Int)
  SenderId: number;

  @Field(() => Int)
  ReceiverId: number;
}
