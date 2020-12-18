import { Test, TestingModule } from '@nestjs/testing';
import { PlanPayPeriodResolver } from './plan_pay_period.resolver';

describe('PlanPayPeriodResolver', () => {
    let resolver: PlanPayPeriodResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlanPayPeriodResolver],
        }).compile();

        resolver = module.get<PlanPayPeriodResolver>(PlanPayPeriodResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
