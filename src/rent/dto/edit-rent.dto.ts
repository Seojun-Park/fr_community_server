import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class EditRentInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  RentId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  deposit?: string;

  @Field({ nullable: true })
  type?: 'studio' | 'apartment' | 'house';

  @Field({ nullable: true })
  heatType?: 'central' | 'individual';

  @Field({ nullable: true })
  term?: 'long' | 'short';

  @Field({ nullable: true })
  allocation?: boolean;

  @Field({ nullable: true })
  availableFrom?: string;

  @Field({ nullable: true })
  square?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  option?: 'single' | 'colocation' | 'sous-location';

  @Field(() => Boolean, { nullable: true })
  proof: boolean;

  @Field(() => Boolean, { nullable: true })
  commission?: boolean;

  @Field(() => Boolean, { nullable: true })
  guarantor?: boolean;
}
