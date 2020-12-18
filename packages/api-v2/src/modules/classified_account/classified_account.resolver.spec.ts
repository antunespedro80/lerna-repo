import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiedAccountResolver } from './classified_account.resolver';

describe('ClassifiedAccountResolver', () => {
    let resolver: ClassifiedAccountResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClassifiedAccountResolver],
        }).compile();

        resolver = module.get<ClassifiedAccountResolver>(
            ClassifiedAccountResolver,
        );
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
