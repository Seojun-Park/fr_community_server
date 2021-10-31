import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Chat } from '../entity/chat.entity';

@ObjectType()
export class ChatReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => Chat, { nullable: true })
  data?: Chat | null;
}

@ObjectType()
export class ChatsReturn {
  @Field((type) => Boolean)
  success: boolean;

  @Field((type) => String || Error, { nullable: true })
  error?: string | null;

  @Field((type) => [Chat], { nullable: true })
  data?: Chat[] | null;
}

@ObjectType()
export class ChatOutReturn {
  @Field((type) => Int)
  chatId: number;
  @Field((type) => Int)
  userId: number;
}
