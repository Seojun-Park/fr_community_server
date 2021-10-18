import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
@ObjectType()
export class Recruit extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field()
  period: string;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  salary: string;

  @Column({
    type: 'enum',
    name: 'type',
    enum: ['hiring', 'searching'],
  })
  @Field({ description: 'recruting type hiring / searching / done' })
  type: string;

  @Column({ name: 'OwnderId' })
  @Field((type) => Int)
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

  @ManyToOne(() => User, (user) => user.Recruits)
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  @Field(() => User)
  Owner: User;
}
