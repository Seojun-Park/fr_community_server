import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../image/entity/image.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Market extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column({ name: 'UserId' })
  @Field((type) => Int)
  UserId: number;

  @Column()
  @Field({ description: 'euro currency' })
  price: string;

  @Column()
  @Field()
  location: string;

  @Column({
    type: 'enum',
    name: 'type',
    enum: ['buy', 'sell'],
  })
  @Field({ description: 'deal type buy / sell' })
  type: string;

  @Column({
    type: 'enum',
    name: 'status',
    enum: ['sold', 'onSale'],
  })
  @Field({ description: 'deal status sold / onSale' })
  status: string;

  @Column()
  @Field({ nullable: true })
  thumbnail?: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @ManyToOne(() => User, (user) => user.Market, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  @Field(() => User)
  User: User;

  @OneToMany(() => Image, (image) => image.Market, { nullable: true })
  @Field(() => [Image], { nullable: true })
  Images?: Image[];
}
