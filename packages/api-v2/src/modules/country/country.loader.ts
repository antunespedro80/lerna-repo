import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Injectable({ scope: Scope.REQUEST })
export class CountryLoader {
    constructor(private readonly countryService: CountryService) {}

    public readonly findByIds = new DataLoader<number, Country | null>(
        async (ids) => {
            const result = await this.countryService.findByIds([...ids]);
            return ids.map(
                (id) => result.find((country) => country.id === id) || null,
            );
        },
    );
}
