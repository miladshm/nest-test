import {Module} from '@nestjs/common';
import {CoffeeService} from "./coffee.service";
import {CoffeeController} from "./coffee.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Coffee} from "./entities/coffee.entity";
import {Flavor} from "./entities/flavor.entity";
import {Event} from "../events/entities/event.entity";
import coffeeConfig from "./config/coffee.config";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        ConfigModule.forFeature(coffeeConfig),
        TypeOrmModule.forFeature([
            Coffee,
            Flavor,
            Event
        ])
    ],
    providers: [
        CoffeeService
    ],
    controllers: [CoffeeController]
})
export class CoffeeModule {
}
