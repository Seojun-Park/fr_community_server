import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @IsNotEmpty()
  @Field()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  content: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  category: string;
}
