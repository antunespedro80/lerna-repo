import { Injectable, Inject } from '@nestjs/common';
import { ClassifiedAccount } from './classified_account.model';

@Injectable()
export class ClassifiedAccountService {
    constructor(
        @Inject(ClassifiedAccount)
        private readonly classAccModel: typeof ClassifiedAccount,
    ) {}

    async getClassAccCountries(id: number) {
        return await this.classAccModel
            .relatedQuery('external_countries')
            .for(id);
    }
}
