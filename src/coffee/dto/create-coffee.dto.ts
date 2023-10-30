import {IsArray, IsDefined, IsString} from "class-validator";

export class CreateCoffeeDto {

    // @IsDefined()
    @IsString()
    readonly name: string;

    // @IsDefined()
    @IsString()
    readonly brand: string;

    @IsString({each: true})
    readonly flavors: string[];
}
