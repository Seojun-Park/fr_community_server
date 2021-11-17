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
import { Board } from '../../board/entity/board.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Reply extends BaseEntity {
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

  @ManyToOne((type) => Board, (board) => board.Replies, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field((type) => Board, { nullable: true })
  @JoinColumn([{ name: 'BoardId', referencedColumnName: 'id' }])
  Board: Board | null;

  @Column({ name: 'UserId' })
  @Field((type) => User)
  UserId: number;

  @ManyToOne((type) => User, (user) => user.Replies, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @Field((type) => User)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: User;
}
