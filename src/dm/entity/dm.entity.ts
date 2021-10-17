import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from '../../chat/entity/chat.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Dm extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  SenderId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ReceiverId: number;

  @Column()
  @Field(() => Int)
  ChatId: number;

  @ManyToOne((type) => User, (user) => user.AsSender, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SenderId', referencedColumnName: 'id' }])
  @Field(() => User, { nullable: true })
  Sender: User;

  @ManyToOne((type) => User, (user) => user.AsReceiver, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @Field(() => User, { nullable: true })
  @JoinColumn([{ name: 'ReceiverId', referencedColumnName: 'id' }])
  Receiver: User;

  @ManyToOne((type) => Chat, (chat) => chat.messages, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @Field(() => Chat)
  @JoinColumn([{ name: 'ChatId', referencedColumnName: 'id' }])
  Chat: Chat;
}
