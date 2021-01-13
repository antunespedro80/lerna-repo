import { Test, TestingModule } from '@nestjs/testing';
import { BrandSignupService } from './brandSignup.service';

describe('BrandSignupService', () => {
    let service: BrandSignupService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BrandSignupService],
        }).compile();

        service = module.get<BrandSignupService>(BrandSignupService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
