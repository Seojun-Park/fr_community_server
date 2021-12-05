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
import { Market } from '../../market/entity/market.entity';
import { Rent } from '../../rent/entity/rent.entity';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  url: string;

  @Column({ name: 'MarketId', nullable: true })
  @Field(() => Int, { nullable: true })
  MarketId: number;

  @Column({ name: 'RentId', nullable: true })
  @Field(() => Int, { nullable: true })
  RentId: number;

  @Column({ name: 'BoardId', nullable: true })
  @Field(() => Int, { nullable: true })
  BoardId: number;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @ManyToOne(() => Market, (market) => market.Images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn([{ name: 'MarketId', referencedColumnName: 'id' }])
  @Field(() => Market)
  Market: Market | null;

  @ManyToOne(() => Rent, (rent) => rent.Images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn([{ name: 'RentId', referencedColumnName: 'id' }])
  Rent: Rent | null;

  @ManyToOne(() => Board, (board) => board.Images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn([{ name: 'BoardId', referencedColumnName: 'id' }])
  Board: Board | null;
}
