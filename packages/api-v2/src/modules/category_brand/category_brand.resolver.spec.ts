import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBrandResolver } from './category_brand.resolver';

describe('CategoryBrandResolver', () => {
    let resolver: CategoryBrandResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryBrandResolver],
        }).compile();

        resolver = module.get<CategoryBrandResolver>(CategoryBrandResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
