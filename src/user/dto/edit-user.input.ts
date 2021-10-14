import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class EditUserInput {
  @Field((type) => Int)
  id: number;

  @IsString()
  @Field({ nullable: true })
  firstName?: string;

  @IsString()
  @Field({ nullable: true })
  lastName?: string;

  @IsString()
  @Field({ nullable: true })
  nickname?: string;
}
