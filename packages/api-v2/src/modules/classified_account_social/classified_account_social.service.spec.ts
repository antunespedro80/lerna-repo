import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiedAccountSocialService } from './classified_account_social.service';

describe('ClassifiedAccountSocialService', () => {
    let service: ClassifiedAccountSocialService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClassifiedAccountSocialService],
        }).compile();

        service = module.get<ClassifiedAccountSocialService>(
            ClassifiedAccountSocialService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
