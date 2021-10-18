import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRecruitInput {
  @IsNotEmpty()
  @Field((type) => Int)
  UserId: number;

  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  content: string;

  @IsNotEmpty()
  @Field()
  period: string;

  @IsNotEmpty()
  @Field()
  location: string;

  @IsNotEmpty()
  @Field()
  salary: string;

  @IsNotEmpty()
  @Field()
  type: string;
}
