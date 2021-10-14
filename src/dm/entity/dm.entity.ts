import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Dm {
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

  @ManyToOne((type) => User, (user) => user.AsSender, { nullable: true })
  @Field(() => User, { nullable: true })
  Sender: User;

  @ManyToOne(() => User, (user) => user.AsReceiver, { nullable: true })
  @Field(() => User, { nullable: true })
  Receiver: User;
}
