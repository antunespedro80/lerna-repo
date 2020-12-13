import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { InvalidEncrpytionException } from './exceptions/InvalidEncryptionException';

@Injectable()
export default class EncryptHelper {
    constructor(private configService: ConfigService) {}

    get secret_key() {
        const key = this.configService.get<string>('SECRET_KEY') || '';

        return crypto
            .createHash('sha256')
            .update(key)
            .digest('hex')
            .substr(0, 32);
    }
    get secret_iv() {
        const key = this.configService.get<string>('SECRET_IV') || '';

        return crypto
            .createHash('sha256')
            .update(key)
            .digest('hex')
            .substr(0, 16);
    }
    get encryptionMethod() {
        return 'AES-256-CBC';
    }

    encrypt(value: string) {
        const encryptor = crypto.createCipheriv(
            this.encryptionMethod,
            this.secret_key,
            this.secret_iv,
        );
        return Buffer.from(
            encryptor.update(value, 'utf8', 'base64') +
                encryptor.final('base64'),
        ).toString('base64');
    }

    decryptToNumber(value: string | number): number {
        return Number(this.decrypt(value));
    }

    decrypt(value: string | number) {
        if (typeof value === 'number') {
            value = String(value);
        }

        try {
            value = Buffer.from(value, 'base64').toString('ascii');
            const decryptor = crypto.createDecipheriv(
                this.encryptionMethod,
                this.secret_key,
                this.secret_iv,
            );

            return (
                decryptor.update(value, 'base64', 'utf8') +
                decryptor.final('utf8')
            );
        } catch (err) {
            throw new InvalidEncrpytionException('Invalid param');
        }
    }
}
