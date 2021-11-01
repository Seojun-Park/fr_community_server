import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../../board/entity/board.entity';
import { Market } from '../../market/entity/market.entity';
import { Meet } from '../../meet/entity/meet.entity';
import { Recruit } from '../../recruit/entity/recruit.entity';
import { Rent } from '../../rent/entity/rent.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ name: 'OwnerId' })
  @Field(() => Int)
  OwnerId: number;

  @ManyToMany(() => Board, (board) => board.Likes, { nullable: true })
  @JoinTable({
    name: 'likeBoards',
    joinColumn: {
      name: 'LikeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'BoardId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Board], { nullable: true })
  Boards: Board[] | null;

  @ManyToMany(() => Market, (market) => market.Likes, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'likeMarket',
    joinColumn: {
      name: 'LikeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'MarketId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Market], { nullable: true })
  Markets: Market[] | null;

  @ManyToMany(() => Meet, (meet) => meet.Likes, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'likeMeet',
    joinColumn: {
      name: 'LikeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'MeetId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Meet], { nullable: true })
  Meets: Meet[] | null;

  @ManyToMany(() => Recruit, (recruit) => recruit.Likes, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'likeRecruit',
    joinColumn: {
      name: 'LikeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'RecruitId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Recruit], { nullable: true })
  Recruits: Recruit[] | null;

  @ManyToMany(() => Rent, (rent) => rent.Likes, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'likeRent',
    joinColumn: {
      name: 'LikeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'RentId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Rent], { nullable: true })
  Rents: Rent[] | null;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @OneToOne((type) => User, (user) => user.Like, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnderId', referencedColumnName: 'id' }])
  @Field(() => User)
  Owner: User;
}
