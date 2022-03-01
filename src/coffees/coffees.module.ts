import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity'
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';

@Injectable()
export class CoffeeBrandsFactory{
    create(){
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], //forFeature param: array of entities
    controllers: [CoffeesController], 
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS, 
            useFactory: () => ['buddy brew', 'nescafe'],
            scope: Scope.TRANSIENT,
            inject: [Connection],
        },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
