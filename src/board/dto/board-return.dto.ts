import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from '../entity/board.entity';

@ObjectType()
export class BoardReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => Board, { nullable: true })
  data?: Board | null;
}

@ObjectType()
export class BoardsReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [Board], { nullable: true })
  data?: Board[] | null;
}
