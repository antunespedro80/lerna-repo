import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderResolver } from './gender.resolver';
import { ObjectionModule } from '../database/objection/objection.module';
import { Gender } from './gender.model';
import { GenderLoader } from './gender.loader';

@Module({
    providers: [GenderService, GenderResolver, GenderLoader],
    imports: [ObjectionModule.forFeature([Gender])],
    exports: [GenderLoader],
})
export class GenderModule {}
