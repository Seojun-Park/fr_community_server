import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../image/entity/image.entity';
import { Like } from '../../like/entity/like.entity';
import { Reply } from '../../reply/entity/reply.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field()
  category: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @Column({ name: 'WriterId' })
  @Field(() => Int)
  WriterId: number;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @ManyToOne(() => User, (user) => user.Board, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @Field((Type) => User)
  @JoinColumn([{ name: 'WriterId', referencedColumnName: 'id' }])
  Writer: User;

  @OneToMany(() => Reply, (reply) => reply.Board, { nullable: true })
  @Field((type) => [Reply], { nullable: true })
  Replies: Reply[] | null;

  @OneToMany(() => Image, (image) => image.Board, { nullable: true })
  @Field((type) => [Image], { nullable: true })
  Images: Image[] | null;

  @ManyToMany(() => Like, (like) => like.Boards, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @Field(() => [Like], { nullable: true })
  Likes: Like[] | null;
}
