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
export class Rent extends BaseEntity {
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
  price: string;

  @Column()
  @Field()
  deposit: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  square: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  option: string;

  @Column()
  @Field(() => Boolean)
  commission: boolean;

  @Column()
  @Field(() => Boolean)
  guarantor: boolean;

  @Column()
  @Field({ nullable: true })
  thumbnail?: string;

  @Column({ name: 'UserId' })
  UserId: number;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @DeleteDateColumn()
  @Field({ nullable: true })
  deletedAt?: string | null;

  @OneToMany(() => Image, (image) => image.Rent, { nullable: true })
  @Field(() => [Image])
  Images: Image[];

  @ManyToOne(() => User, (user) => user.Rent)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  @Field(() => User)
  User: User;
}
