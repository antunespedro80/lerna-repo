import { ParseIntPipe } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { Country } from '../country/country.model';
import { DecryptPipe } from '../helpers/pipes/decrypt.pipe';
import { ClassifiedAccount } from './classified_account.model';
import { ClassifiedAccountService } from './classified_account.service';

@Resolver(() => ClassifiedAccount)
export class ClassifiedAccountResolver {
    constructor(private readonly classAccService: ClassifiedAccountService) {}

    @Query(() => [Country], {
        name: 'getClassAccCountries',
        description: 'Get all countries of given classified_account',
    })
    getClassAccCountries(
        @Args('id', { type: () => String }, DecryptPipe, ParseIntPipe)
        id: number,
    ) {
        return this.classAccService.getClassAccCountries(id);
    }
}
