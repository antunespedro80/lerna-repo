import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiedAccountSocialResolver } from './classified_account_social.resolver';

describe('ClassifiedAccountSocialResolver', () => {
    let resolver: ClassifiedAccountSocialResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClassifiedAccountSocialResolver],
        }).compile();

        resolver = module.get<ClassifiedAccountSocialResolver>(
            ClassifiedAccountSocialResolver,
        );
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
