import { Module } from '@nestjs/common';
import { Plan } from './plan.model';

@Module({
    providers: [Plan],
})
export class PlanModule {}
