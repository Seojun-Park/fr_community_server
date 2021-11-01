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
import { Like } from '../../like/entity/like.entity';
import { User } from '../../user/entity/user.entity';
import { MeetMember } from './meetMember.entity';

@Entity()
@ObjectType()
export class Meet extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column({
    type: 'enum',
    name: 'category',
    enum: ['class', 'meetup'],
    default: ['class'],
  })
  @Field({
    description: 'category type class / meetup',
  })
  category: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  price?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  period?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  maximum?: string;

  @Column({ name: 'OwnerId' })
  @Field(() => Int)
  OwnerId: number;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @ManyToOne(() => User, (user) => user.Meets, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  @Field(() => User)
  Owner: User;

  @OneToMany(() => MeetMember, (meetMember) => meetMember.Meet, {
    nullable: true,
  })
  @Field(() => [MeetMember], { nullable: true })
  MeetMember?: MeetMember[];

  @ManyToMany(() => Like, (like) => like.Meets, { nullable: true })
  @Field(() => [Like], { nullable: true })
  Likes: Like[] | null;
}
