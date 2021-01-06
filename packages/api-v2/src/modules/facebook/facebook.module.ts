import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { ConfigModule } from '@nestjs/config';
import { AuthFacebookResolver } from '../authFacebook/authFacebook.resolver';

@Module({
    imports: [ConfigModule],
    providers: [FacebookService, AuthFacebookResolver],
})
export class FacebookModule {}
