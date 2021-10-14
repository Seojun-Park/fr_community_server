import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
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
import { Rent } from '../../rent/entity/rent.entity';
import { Reply } from '../../reply/entity/reply.entity';

@Entity()
@ObjectType()
export class User {
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
  Board?: Board[];

  @OneToMany(() => Market, (market) => market.User, { nullable: true })
  @Field((type) => [Market], { nullable: true })
  Market?: Market[];

  @OneToMany(() => Rent, (rent) => rent.User, { nullable: true })
  @Field((type) => [Rent], { nullable: true })
  Rent?: Rent[];

  @OneToMany(() => Dm, (dm) => dm.Sender, { nullable: true })
  @Field(() => [Dm], { nullable: true })
  AsSender: Dm[];

  @OneToMany(() => Dm, (dm) => dm.Receiver, { nullable: true })
  @Field(() => [Dm], { nullable: true })
  AsReceiver: Dm[];

  @OneToMany(() => Reply, (reply) => reply.User, { nullable: true })
  @Field(() => [Reply], { nullable: true })
  Replies: Reply[];

  @ManyToMany(() => Chat, (chat) => chat.Members)
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
  @Field(() => [Chat])
  Chats: Chat[];
}
