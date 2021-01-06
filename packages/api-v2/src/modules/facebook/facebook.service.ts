import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FACEBOOK } from 'src/constants';
import { HttpRequestService } from '../helpers/httpRequest/httpRequest.service';
import { error, success } from '../helpers/interfaces/result.interface';
import {
    IResponseError,
    IAccessTokenResponseSuccess,
    IValidatePermissionsResponseSuccess,
    IInfluencerDataForAuthResponseSuccess,
} from './responses.interface';

@Injectable()
export class FacebookService {
    private version: string;
    private client_id: string;
    private client_secret: string;
    private homepage_base_url: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpRequestService: HttpRequestService,
    ) {
        this.version = this.configService.get<string>('FB_GRAPH_VERSION') || '';
        this.client_id = this.configService.get<string>('FB_APP_ID') || '';
        this.client_secret = this.configService.get<string>('FB_APP_SECRET') || '';
        this.homepage_base_url = this.configService.get<string>('HOMEPAGE_URL') || '';
    }

    /**
     * TODO: VER STATE
     */
    oauthUrl() {
        return `${FACEBOOK.BASE_URL}/${this.version}/dialog/oauth?client_id=${this.client_id}&redirect_uri=${
            this.homepage_base_url + FACEBOOK.URIS.login_redirect
        }&state=state1234`;
    }

    async getAccessToken(code: string) {
        const url = `${FACEBOOK.GRAPH_BASE_URL}/${this.version}/oauth/access_token?client_id=${
            this.client_id
        }&redirect_uri=${this.homepage_base_url + FACEBOOK.URIS.login_redirect}&client_secret=${
            this.client_secret
        }&code=${code}`;

        const response = await this.httpRequestService.get<IAccessTokenResponseSuccess, IResponseError>(url);

        if (response.isError) {
            return error(response.error.response?.data);
        }

        return success(response.value.data);
    }

    async validatePermissions(token: string) {
        const url = `${FACEBOOK.GRAPH_BASE_URL}/${this.version}/me/permissions?access_token=${token}`;

        // Request to get influencer permissions
        const response = await this.httpRequestService.get<
            IValidatePermissionsResponseSuccess,
            IResponseError
        >(url);

        if (response.isError) {
            return error(response.error.response?.data);
        }

        const infPermissions = response.value.data.data;
        for (let i = 0; i < infPermissions.length; i++) {
            if (
                FACEBOOK.PERMISSIONS.includes(infPermissions[i].permission) &&
                infPermissions[i].status !== 'granted'
            ) {
                return false;
            }
        }

        return true;
    }

    async getDataNeededForInfluencerAuth(token: string) {
        const url = `${FACEBOOK.GRAPH_BASE_URL}/${this.version}/me?fields=id,email,name,accounts{instagram_business_account.fields(followers_count,name,username,profile_picture_url,ig_id,id)}&access_token=${token}`;

        // Request to get influencer data for authentication
        const response = await this.httpRequestService.get<
            IInfluencerDataForAuthResponseSuccess,
            IResponseError
        >(url);

        // COMO MANDAR A MENSAGEM DE ERRO CUSTOMIZADA OU UMA DEFAULT
        if (response.isError) {
            return error(response.error.response?.data);
        }

        // If has no accounts, Facebook does not return the attribute
        if (!response.value.data.accounts) {
            return error(
                'No Instagram accounts found. Please associate your Instagram account with a page of this Facebook account.',
            );
        }

        // If it is not possible to access email, Facebook does not return the attribute
        if (!response.value.data.email) {
            return error(
                `We can't get your email address. Make sure that the email that you use in your Facebook account is valid.`,
            );
        }
    }
}
