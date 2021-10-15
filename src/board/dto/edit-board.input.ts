import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class EditBoardInput {
  @IsNotEmpty()
  @Field((type) => Int)
  boardId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}
