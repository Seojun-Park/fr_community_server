import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
