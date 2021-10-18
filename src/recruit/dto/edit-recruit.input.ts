import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class EditRecruitInput {
  @IsNotEmpty()
  @IsNumber()
  @Field((type) => Int)
  RecruitId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  period?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  salary?: string;

  @Field({ nullable: true })
  type?: string;
}
