import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { GroupMessageModule } from './group-message/group-message.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'chatDB.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GroupModule,
    GroupMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
