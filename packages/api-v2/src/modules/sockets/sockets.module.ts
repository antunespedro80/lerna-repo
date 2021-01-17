import { Module } from '@nestjs/common';
import { CampaignsSocketsService } from './services/campaignsSockets.service';
import { ChatSocketsService } from './services/chatSockets.service';
import { NotificationsSocketsService } from './services/notificationsSockets.service';
import { SocketsService } from './services/sockets.service';
import { TokenService } from './services/token.service';

@Module({
    providers: [
        SocketsService,
        ChatSocketsService,
        NotificationsSocketsService,
        CampaignsSocketsService,
        TokenService,
    ],
    exports: [NotificationsSocketsService, CampaignsSocketsService, ChatSocketsService],
})
export class SocketsModule {}
