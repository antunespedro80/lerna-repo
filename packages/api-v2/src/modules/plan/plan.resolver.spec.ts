import { Test, TestingModule } from '@nestjs/testing';
import { PlanResolver } from './plan.resolver';

describe('PlanResolver', () => {
    let resolver: PlanResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlanResolver],
        }).compile();

        resolver = module.get<PlanResolver>(PlanResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
