import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import EncryptHelper from './encrypt.helper';
import * as faker from 'faker';
import { InvalidEncrpytionException } from './exceptions/InvalidEncryptionException';

describe('EncryptHelper', () => {
    let service: EncryptHelper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EncryptHelper],
            imports: [ConfigModule],
        }).compile();

        service = module.get<EncryptHelper>(EncryptHelper);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('encrypt then decrypt toBe equalt to original', () => {
        const toEncrypt = String(
            faker.random.number({ min: 1, max: 99999999 }),
        );
        const encrypted = service.encrypt(toEncrypt);
        const decrypted = service.decrypt(encrypted);
        expect(toEncrypt).toBe(decrypted);
    });

    it('when invalid encryption throw exception', () => {
        const toDecrypt = faker.random.alphaNumeric();
        expect(() => {
            service.decrypt(toDecrypt);
        }).toThrow(InvalidEncrpytionException);
    });
});
