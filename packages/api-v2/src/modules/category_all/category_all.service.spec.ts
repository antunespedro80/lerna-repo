import { Test, TestingModule } from '@nestjs/testing';
import { CategoryAllService } from './category_all.service';

describe('CategoryAllService', () => {
    let service: CategoryAllService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryAllService],
        }).compile();

        service = module.get<CategoryAllService>(CategoryAllService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
