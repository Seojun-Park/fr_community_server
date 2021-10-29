import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Dm } from '../../dm/entity/dm.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @ManyToMany(() => User, (user) => user.Chats, { eager: true })
  @JoinTable({
    name: 'chatmembers',
    joinColumn: {
      name: 'ChatId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [User])
  Members: User[];

  @OneToMany(() => Dm, (dm) => dm.Chat, { nullable: true })
  @Field(() => [Dm], { nullable: true })
  messages: Dm[] | null;

  @Column()
  @Field(() => Int)
  Member1: number;

  @Column()
  @Field(() => Int)
  Member2: number;
}
