import {Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Injectable()
export class CoffeeService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) {
    }

    index() {
        return this.coffeeRepository.find()
    }

    async show(id: number) {
        const coffee = await this.coffeeRepository.findOne({where: {id}});
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });

        if (!coffee)
            throw new NotFoundException(`Coffee #${id} not found`);

        return this.coffeeRepository.save(coffee);

    }

    async delete(id: number) {
        const coffee = await this.show(id);
        return this.coffeeRepository.remove(coffee);
    }
}
