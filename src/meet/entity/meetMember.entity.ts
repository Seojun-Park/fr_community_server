import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Meet } from './meet.entity';

@Index('UserId', ['UserId'], {})
@Entity()
@ObjectType()
export class MeetMember extends BaseEntity {
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ primary: true, name: 'MeetId' })
  @Field(() => Int)
  MeetId: number;

  @Column({ primary: true, name: 'UserId' })
  @Field(() => Int)
  UserId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  loggedInAt?: string | null;

  @ManyToOne(() => Meet, (meet) => meet.MeetMember, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'MeetId', referencedColumnName: 'id' }])
  @Field(() => Meet)
  Meet: Meet;

  @ManyToOne(() => User, (user) => user.MeetMember, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  @Field(() => User)
  User: User;
}
