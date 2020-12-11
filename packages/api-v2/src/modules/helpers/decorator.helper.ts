import { Injectable } from '@nestjs/common';
import EncryptHelper from './encrypt.helper';

/**
 * Class used to expose providers to decorators
 */
@Injectable()
export class DecoratorHelper {
    private static encryptHelper: EncryptHelper | undefined = undefined;
    public constructor(service: EncryptHelper) {
        DecoratorHelper.encryptHelper = service;
    }
    public static getEncryptHelper(): EncryptHelper {
        if (!DecoratorHelper.encryptHelper) {
            throw new Error('DecoratorService not initialized');
        }
        return DecoratorHelper.encryptHelper;
    }
}
