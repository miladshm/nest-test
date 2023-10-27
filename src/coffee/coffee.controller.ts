import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {CoffeeService} from "./coffee.service";

@Controller('coffee')
export class CoffeeController {

    constructor(private readonly coffeeService: CoffeeService) {
    }

    @Get()
    index(@Query() pagination) {
        // const {limit, offset} = pagination;
        return this.coffeeService.index();
    }

    @Get(':id')
    show(@Param('id') id: string) {
        return this.coffeeService.show(id);
    }

    @Post()
    create(@Body() body) {
        //This action creates new coffee
        this.coffeeService.create(body);
        return this.coffeeService.show(body.id);

    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        //This action updates new coffee
        this.coffeeService.update(id, body);
        return this.coffeeService.show(id);
    }

    @Delete()
    delete(@Param('id') id: string) {
        //This action creates new coffee
        return this.coffeeService.delete(id);
    }
}
