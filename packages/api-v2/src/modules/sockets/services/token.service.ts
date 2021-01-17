import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { EncryptionService } from '../../helpers/encryption/encryption.service';
import { SocketsTokenDTO } from '../dto/sockets.dto';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly encryptionService: EncryptionService,
    ) {}

    createToken() {
        const key = this.configService.get<string>('JWT_HS256_KEY') || null;
        if (key === null) {
            throw new InternalServerErrorException('JWT key config');
        }

        const timestamp = moment().unix();

        const tokenContent: SocketsTokenDTO = {
            exp: timestamp + 2629743,
            iat: timestamp,
            user_type: 0,
            id_user: -1,
        };

        try {
            const token = jwt.sign(tokenContent, key, { algorithm: 'HS256' });
            return token;
        } catch (e) {
            return null;
        }
    }
}
