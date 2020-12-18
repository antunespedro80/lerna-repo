import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiedAccountService } from './classified_account.service';

describe('ClassifiedAccountService', () => {
    let service: ClassifiedAccountService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClassifiedAccountService],
        }).compile();

        service = module.get<ClassifiedAccountService>(
            ClassifiedAccountService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
