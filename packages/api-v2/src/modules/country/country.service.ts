import { Inject, Injectable } from '@nestjs/common';
import { Country } from './country.model';

@Injectable()
export class CountryService {
    constructor(
        @Inject(Country) private readonly countryModel: typeof Country,
    ) {}

    async findAll() {
        return await this.countryModel.query().where({ status: 1 });
    }

    async findOne(id: number) {
        return await this.countryModel
            .query()
            .where({ status: 1 })
            .findById(id);
    }

    async findByIds(ids: number[]) {
        return await this.countryModel.query().findByIds(ids);
    }
}
