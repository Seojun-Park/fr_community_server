import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../../board/entity/board.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Reply {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
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

  @Column({ name: 'BoardId' })
  @Field(() => Int)
  BoardId: number;

  @ManyToOne((type) => Board, (board) => board.Replies)
  @Field((type) => Board)
  @JoinColumn([{ name: 'BoardId', referencedColumnName: 'id' }])
  Board: Board;

  @Column({ name: 'UserId' })
  @Field((type) => User)
  UserId: number;

  @ManyToOne((type) => User, (user) => user.Replies)
  @Field((type) => User)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: User;
}
