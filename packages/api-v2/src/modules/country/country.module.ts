import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { ObjectionModule } from '../database/objection/objection.module';
import { Country } from './country.model';

@Module({
    providers: [CountryService, CountryResolver],
    imports: [ObjectionModule.forFeature([Country])],
})
export class CountryModule {}
