export interface SocketsDTO<T> {
    to_id: string;
    to_type: number;
    msg: T;
}

export interface SendMessageDTO {
    idMsg: string;
    idCampInf: string;
    idCamp: string;
}

export interface SocketsTokenDTO {
    exp: number;
    iat: number;
    user_type: number;
    id_user: number;
}

export enum SocketsEventsDTO {
    MESSAGE = 'sendMessage',
    UPDATE_CAMPAIGN_INFO = 'updateCampInf',
    NOTIFICATION = 'sendNotification',
}
