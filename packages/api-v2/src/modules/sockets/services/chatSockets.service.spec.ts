import { Test, TestingModule } from '@nestjs/testing';
import { ChatSocketsService } from './chatSockets.service';

describe('ChatSocketsService', () => {
    let service: ChatSocketsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ChatSocketsService],
        }).compile();

        service = module.get<ChatSocketsService>(ChatSocketsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
