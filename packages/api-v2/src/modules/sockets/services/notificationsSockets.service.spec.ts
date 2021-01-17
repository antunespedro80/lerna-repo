import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsSocketsService } from './notificationsSockets.service';

describe('NotificationsSocketsService', () => {
    let service: NotificationsSocketsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NotificationsSocketsService],
        }).compile();

        service = module.get<NotificationsSocketsService>(NotificationsSocketsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
