import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Board } from './src/board/entity/board.entity';
import { Chat } from './src/chat/entity/chat.entity';
import { Dm } from './src/dm/entity/dm.entity';
import { Image } from './src/image/entity/image.entity';
import { Market } from './src/market/entity/market.entity';
import { Meet } from './src/meet/entity/meet.entity';
import { MeetMember } from './src/meet/entity/meetMember.entity';
import { Recruit } from './src/recruit/entity/recruit.entity';
import { Rent } from './src/rent/entity/rent.entity';
import { Reply } from './src/reply/entity/reply.entity';
import { User } from './src/user/entity/user.entity';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    User,
    Chat,
    Dm,
    Board,
    Market,
    Image,
    Rent,
    Reply,
    Recruit,
    Meet,
    MeetMember,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  keepConnectionAlive: true,
};

export = config;
