import {Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Connection, Repository} from "typeorm";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {Flavor} from "./entities/flavor.entity";
import {Event} from "../events/entities/event.entity";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Injectable()
export class CoffeeService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection
    ) {
    }

    index(pagination: PaginationQueryDto) {
        const {limit, offset} = pagination;
        return this.coffeeRepository.find({relations: ['flavors'], take: limit, skip: offset})
    }

    async show(id: number) {
        const coffee = await this.coffeeRepository.findOne({where: {id}, relations: ['flavors']});
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        );
        const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors});
        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors =
            updateCoffeeDto.flavors &&
            (await Promise.all(
                updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
            ));
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        });

        if (!coffee)
            throw new NotFoundException(`Coffee #${id} not found`);

        return this.coffeeRepository.save(coffee);

    }

    async delete(id: number) {
        const coffee = await this.show(id);
        return this.coffeeRepository.remove(coffee);
    }

    async recommendCoffee(coffee: Coffee) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = {coffeeId: coffee.id};

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const flavor = await this.flavorRepository.findOne({where: {name}});
        if (flavor) {
            return flavor;
        }
        return this.flavorRepository.create({name});
    }
}
