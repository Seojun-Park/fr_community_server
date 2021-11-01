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
import { Image } from '../../image/entity/image.entity';
import { Like } from '../../like/entity/like.entity';
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

  @Column({
    type: 'enum',
    name: 'type',
    enum: ['studio', 'apartment', 'house'],
    default: ['studio'],
  })
  // @Column()
  @Field({
    description: 'type of residence such as studio / apartment / house',
  })
  type: string;

  @Column({
    type: 'enum',
    name: 'term',
    enum: ['long', 'short'],
    default: ['long'],
  })
  // @Column()
  @Field({ description: 'rent period such as long / short' })
  term: string;

  @Column({
    type: 'enum',
    name: 'heatType',
    enum: ['central', 'individual'],
    default: 'central',
  })
  @Field({ description: 'heat type such as central / individual' })
  heatType: string;

  @Column()
  @Field()
  square: string;

  @Column()
  @Field()
  address: string;

  @Column({
    type: 'enum',
    name: 'option',
    enum: ['single', 'colocation', 'sous-location'],
    default: ['single'],
  })
  // @Column()
  @Field({
    description: 'form of residence single / colocation / sous-location',
  })
  option: string;

  @Column()
  @Field(() => Boolean)
  allocation: boolean;

  @Column()
  @Field(() => Boolean)
  proof: boolean;

  @Column()
  @Field(() => Boolean)
  commission: boolean;

  @Column()
  @Field(() => Boolean)
  guarantor: boolean;

  @Column()
  @Field()
  availableFrom: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  thumbnail?: string;

  @Column({ name: 'UserId' })
  @Field(() => Int)
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

  @ManyToMany(() => Like, (like) => like.Rents, { nullable: true })
  @Field(() => Like, { nullable: true })
  Likes: Like[] | null;
}
