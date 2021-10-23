import AdminJS from 'adminjs';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { MarketModule } from './market/market.module';
import { ImageModule } from './image/image.module';
import { RentModule } from './rent/rent.module';
import { DmModule } from './dm/dm.module';
import { ChatModule } from './chat/chat.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import * as ormconfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReplyModule } from './reply/reply.module';
import { User } from './user/entity/user.entity';
import { Board } from './board/entity/board.entity';
import { Market } from './market/entity/market.entity';
import { Rent } from './rent/entity/rent.entity';
import { Chat } from './chat/entity/chat.entity';
import { RecruitModule } from './recruit/recruit.module';
import { Recruit } from './recruit/entity/recruit.entity';
import { Meet } from './meet/entity/meet.entity';
import { AuthModule } from './auth/auth.module';
import { MeetModule } from './meet/meet.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

AdminJS.registerAdapter({ Database, Resource });
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
          // onConnect: (connectionParams) => {
          //   console.log(connectionParams);
          // },
        },
      },
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        console.log(token);
      },
      cors: {
        origin: process.env.COR_ORIGIN_DEV,
        credentials: true,
      },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    BoardModule,
    MarketModule,
    ImageModule,
    RentModule,
    DmModule,
    ChatModule,
    ReplyModule,
    RecruitModule,
    MeetModule,
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [User, Market, Board, Rent, Chat, Recruit, Meet],
      },
      auth: {
        authenticate: async (email, password) =>
          Promise.resolve({ email: process.env.ADMIN_ID }),
        cookieName: process.env.COOKIE_NAME,
        cookiePassword: process.env.ADMIN_PASS,
      },
    } as any),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
