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

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
