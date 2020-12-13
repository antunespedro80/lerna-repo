import { Args, Query, Resolver } from '@nestjs/graphql';
import { DecryptPipe } from '../helpers/pipes/decrypt.pipe';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Resolver(() => Country)
export class CountryResolver {
    constructor(private countryService: CountryService) {}

    @Query(() => [Country], {
        name: 'countries',
        description: 'Find all countries',
    })
    findAll() {
        return this.countryService.findAll();
    }

    @Query(() => Country, {
        name: 'country',
        description: 'Find one country',
        nullable: true,
    })
    findOne(@Args('id', { type: () => String }, DecryptPipe) id: number) {
        return this.countryService.findOne(id);
    }
}
