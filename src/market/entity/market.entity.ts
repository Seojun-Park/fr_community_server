import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
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
export class Market {
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
  @Field()
  price: string;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  status: string;

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
