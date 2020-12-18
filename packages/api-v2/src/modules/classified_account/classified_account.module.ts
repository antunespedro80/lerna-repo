import { Module } from '@nestjs/common';
import { ObjectionModule } from '../database/objection/objection.module';
import { ClassifiedAccount } from './classified_account.model';
import { ClassifiedAccountResolver } from './classified_account.resolver';
import { ClassifiedAccountService } from './classified_account.service';

@Module({
    providers: [ClassifiedAccountService, ClassifiedAccountResolver],
    imports: [ObjectionModule.forFeature([ClassifiedAccount])],
})
export class ClassifiedAccountModule {}
