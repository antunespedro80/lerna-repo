import { Test, TestingModule } from '@nestjs/testing';
import { PlanPayPeriodService } from './plan_pay_period.service';

describe('PlanPayPeriodService', () => {
    let service: PlanPayPeriodService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlanPayPeriodService],
        }).compile();

        service = module.get<PlanPayPeriodService>(PlanPayPeriodService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
