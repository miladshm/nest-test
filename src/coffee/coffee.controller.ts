import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CoffeeService} from "./coffee.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Controller('coffee')
export class CoffeeController {

    constructor(private readonly coffeeService: CoffeeService) {
    }

    @Get()
    index(@Query() pagination: PaginationQueryDto) {
        return this.coffeeService.index(pagination);
    }

    @Get(':id')
    show(@Param('id') id: number) {
        return this.coffeeService.show(id);
    }

    @Post()
    create(@Body() body: CreateCoffeeDto) {
        //This action creates new coffee
        return this.coffeeService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateCoffeeDto) {
        //This action updates new coffee
        return this.coffeeService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        //This action creates new coffee
        return this.coffeeService.delete(id);
    }
}
