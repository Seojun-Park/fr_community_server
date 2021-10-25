import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../../board/entity/board.entity';
import { Chat } from '../../chat/entity/chat.entity';
import { Dm } from '../../dm/entity/dm.entity';
import { Market } from '../../market/entity/market.entity';
import { Meet } from '../../meet/entity/meet.entity';
import { MeetMember } from '../../meet/entity/meetMember.entity';
import { Recruit } from '../../recruit/entity/recruit.entity';
import { Rent } from '../../rent/entity/rent.entity';
import { Reply } from '../../reply/entity/reply.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  @Field()
  email: string;

  @Column({ type: 'boolean', default: false })
  @Field((type) => Boolean)
  verified: boolean;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  verifiedCode: string | null;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  nickname: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @OneToMany(() => Board, (board) => board.Writer, { nullable: true })
  @Field((type) => [Board], { nullable: true })
  Board?: Board[] | null;

  @OneToMany(() => Market, (market) => market.User, { nullable: true })
  @Field((type) => [Market], { nullable: true })
  Market?: Market[] | null;

  @OneToMany(() => Rent, (rent) => rent.User, { nullable: true })
  @Field((type) => [Rent], { nullable: true })
  Rent?: Rent[] | null;

  @OneToMany(() => Dm, (dm) => dm.Sender, { nullable: true })
  @Field(() => [Dm], { nullable: true })
  AsSender: Dm[] | null;

  @OneToMany(() => Dm, (dm) => dm.Receiver, { nullable: true })
  @Field(() => [Dm], { nullable: true })
  AsReceiver: Dm[] | null;

  @OneToMany(() => Reply, (reply) => reply.User, { nullable: true })
  @Field(() => [Reply], { nullable: true })
  Replies: Reply[] | null;

  @OneToMany(() => Recruit, (recruit) => recruit.Owner, { nullable: true })
  @Field(() => [Recruit], { nullable: true })
  Recruits: Recruit[] | null;

  @OneToMany(() => Meet, (meet) => meet.Owner, { nullable: true })
  @Field(() => [Meet], { nullable: true })
  Meets: Meet[] | null;

  @OneToMany(() => MeetMember, (meetMember) => meetMember.User, {
    nullable: true,
  })
  @Field(() => [MeetMember], { nullable: true })
  MeetMember: MeetMember[] | null;

  @ManyToMany(() => Chat, (chat) => chat.Members, { nullable: true })
  @JoinTable({
    name: 'chatmembers',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ChatId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Chat], { nullable: true })
  Chats: Chat[] | null;
}
