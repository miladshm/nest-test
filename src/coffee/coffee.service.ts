import {Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";

@Injectable()
export class CoffeeService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        }
    ]

    index() {
        return this.coffees
    }

    show(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
    }

    update(id: string, updateCoffeeDto: any) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);

        if (coffeeIndex > 0) {
            this.coffees[coffeeIndex] = updateCoffeeDto;
        } else
            throw new NotFoundException(`Coffee #${id} not found`);

    }

    delete(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);

        if (coffeeIndex > 0) {
            this.coffees.splice(coffeeIndex, 1);
        } else
            throw new NotFoundException(`Coffee #${id} not found`);
    }
}
