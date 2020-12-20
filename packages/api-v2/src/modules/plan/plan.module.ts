import { Module } from '@nestjs/common';
import { Plan } from './plan.model';
import { PlanResolver } from './plan.resolver';

@Module({
    providers: [PlanResolver, Plan],
})
export class PlanModule {}
