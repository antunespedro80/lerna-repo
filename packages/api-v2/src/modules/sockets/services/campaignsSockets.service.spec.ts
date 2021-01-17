import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsSocketsService } from './campaignsSockets.service';

describe('CampaignsSocketsService', () => {
    let service: CampaignsSocketsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CampaignsSocketsService],
        }).compile();

        service = module.get<CampaignsSocketsService>(CampaignsSocketsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
