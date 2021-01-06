import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookService {
    private version: string;
    private client_id: string;
    private client_secret: string;
    private redirect_uri: string;
    private oauth: string;

    constructor(private readonly configService: ConfigService) {
        this.version = this.configService.get<string>('FB_GRAPH_VERSION') || '';
        this.client_id = this.configService.get<string>('FB_APP_ID') || '';
        this.client_secret = this.configService.get<string>('FB_APP_SECRET') || '';
        this.redirect_uri = this.configService.get<string>('HOMEPAGE_URL_TEST') || '';
        /**
         * TODO: VER STATE
         */
        this.oauth = `https://www.facebook.com/${this.version}/dialog/oauth?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&state=state1234`;
    }

    oauthUrl() {
        return this.oauth;
    }

    accessTokenUrl(code: string) {
        return `https://graph.facebook.com/${this.version}/oauth/access_token?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&client_secret=${this.client_secret}&code=${code}`;
    }
}
