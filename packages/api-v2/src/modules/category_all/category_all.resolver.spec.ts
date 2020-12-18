import { Test, TestingModule } from '@nestjs/testing';
import { CategoryAllResolver } from './category_all.resolver';

describe('CategoryAllResolver', () => {
    let resolver: CategoryAllResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryAllResolver],
        }).compile();

        resolver = module.get<CategoryAllResolver>(CategoryAllResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
