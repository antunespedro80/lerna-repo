export interface IAccessTokenResponseSuccess {
    access_token: string;
    token_type: string;
    expires_in: string;
}

export interface IResponseError {
    message: string;
    type: string;
    code: number;
    fbtrace_id: string;
}

export interface IValidatePermissionsResponseSuccess {
    data: Array<{ permission: string; status: string }>;
}

interface IIfluencerAccounts {
    id: string;
    ig_id: number;
    name: string;
    username: string;
    profile_picture_url?: string;
    followers_count: number;
}

export interface IInfluencerDataForAuthResponseSuccess {
    id: string;
    name: string;
    email: string;
    picture: string;
    accounts: Array<IIfluencerAccounts>;
}
