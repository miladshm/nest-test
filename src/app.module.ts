import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoffeeModule} from './coffee/coffee.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from '@nestjs/config';
import typeorm from './config/typeorm';

@Module({
    imports: [
        CoffeeModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm]
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
