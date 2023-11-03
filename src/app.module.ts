import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoffeeModule} from './coffee/coffee.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from '@nestjs/config';
import {CoffeeRatingModule} from './coffee-rating/coffee-rating.module';
import * as Joi from "@hapi/joi";
import appConfig from "./config/app.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_CONNECTION: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: [Joi.string(), Joi.optional()],
                DB_PORT: Joi.number().default(3306)
            }),
            isGlobal: true,
            load: [appConfig]
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => (configService.get('database'))
        }),
        CoffeeModule,
        CoffeeRatingModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
