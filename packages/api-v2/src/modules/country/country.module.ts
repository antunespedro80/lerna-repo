import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { ObjectionModule } from '../database/objection/objection.module';
import { Country } from './country.model';
import { CountryLoader } from './country.loader';

@Module({
    providers: [CountryService, CountryResolver, CountryLoader],
    imports: [ObjectionModule.forFeature([Country])],
    exports: [CountryLoader],
})
export class CountryModule {}
