import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoffeeModule} from './coffee/coffee.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Coffee} from "./coffee/entities/coffee.entity";
import {Flavor} from "./coffee/entities/flavor.entity";

@Module({
    imports: [CoffeeModule, TypeOrmModule.forRoot({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "coffees",
        autoLoadEntities: true,
        synchronize: true,
    })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
