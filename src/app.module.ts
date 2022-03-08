import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,  //db name
        autoLoadEntities: true,   //helps load modules automatically
        synchronize: true,    //sync with db every time app run. Tip: disable in Production
      })
    }), 
    ConfigModule.forRoot({
      load: [appConfig]   // load custom config files
      // validationSchema: Joi.object({
      //   DB_HOST: Joi.required(),
      //   DB_PORT: Joi.number().default(5432),
      //   DB_USER: Joi.required(),
      //   DB_PASSWORD: Joi.required()
      // })
    }),
    CoffeesModule, 
    
    CoffeeRatingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
