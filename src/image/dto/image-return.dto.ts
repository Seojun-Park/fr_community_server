import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImageReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;
}
