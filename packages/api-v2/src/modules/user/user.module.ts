import { Module } from '@nestjs/common';
import { CountryModule } from '../country/country.module';
import { ObjectionModule } from '../database/objection/objection.module';
import { GenderModule } from '../gender/gender.module';
import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [UserService, UserResolver],
    imports: [ObjectionModule.forFeature([User]), CountryModule, GenderModule],
})
export class UserModule {}
