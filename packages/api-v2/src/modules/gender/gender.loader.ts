import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Gender } from './gender.model';
import { GenderService } from './gender.service';

@Injectable({ scope: Scope.REQUEST })
export class GenderLoader {
    constructor(private readonly genderService: GenderService) {}

    public readonly findByIds = new DataLoader<number, Gender | null>(
        async (ids) => {
            const result = await this.genderService.findByIds([...ids]);
            return ids.map(
                (id) => result.find((gender) => gender.id === id) || null,
            );
        },
    );
}
