import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport:Transport.TCP,
    options:{port:3001}
  })
  const sequelize  =app.get(Sequelize)
 await sequelize.sync({alter:true})
  await app.listen();
}
bootstrap();
