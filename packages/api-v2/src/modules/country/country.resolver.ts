import { ParseIntPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { DecryptPipe } from '../helpers/pipes/decrypt.pipe';
import { User } from '../user/user.model';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Resolver(() => Country)
export class CountryResolver {
    constructor(private readonly countryService: CountryService) {}

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

    @Query(() => [User])
    getUserByCountryId(
        @Args('id', { type: () => String }, DecryptPipe, ParseIntPipe)
        id: number,
    ) {
        return this.countryService.findUsers(id);
    }
}
