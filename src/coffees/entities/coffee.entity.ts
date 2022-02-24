import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "../dto/create-coffee.dto";

export class Coffee {
    id: number;
    name: string;
    brand: string;
    flavors: string[];
}