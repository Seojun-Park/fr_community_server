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
  })
  @JoinColumn([{ name: 'MarketId', referencedColumnName: 'id' }])
  @Field(() => Market)
  Market: Market;

  @ManyToOne(() => Rent, (rent) => rent.Images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'RentId', referencedColumnName: 'id' }])
  Rent: Rent;
}
