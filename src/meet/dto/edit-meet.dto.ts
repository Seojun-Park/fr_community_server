import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class EditMeetInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  period?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  maximum?: string;
}
