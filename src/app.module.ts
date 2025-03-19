import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
     isGlobal:true,

  }), SequelizeModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({
        dialect:'postgres',
        host:configService.get<string>('HOST'),
        port:configService.get<number>('DB_PORT'),
        username:configService.get<string>('DB_USERNAME'),
        password:configService.get<string>('DB_PASSWORD'),
        database:configService.get<string>('DB_NAME'),
        autoLoadModels:true,
        synchronize:true
    })
    
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
