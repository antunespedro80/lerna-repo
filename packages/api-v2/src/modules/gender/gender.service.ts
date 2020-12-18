import { Inject, Injectable } from '@nestjs/common';
import { Gender } from './gender.model';

@Injectable()
export class GenderService {
    constructor(@Inject(Gender) private readonly genderModel: typeof Gender) {}

    async findByIds(ids: Array<number>) {
        return await this.genderModel.query().findByIds(ids);
    }
}
