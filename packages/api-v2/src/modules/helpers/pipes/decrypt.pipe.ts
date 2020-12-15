import { PipeTransform, Injectable } from '@nestjs/common';
import { EncryptHelper } from '../encrypt.helper';

@Injectable()
export class DecryptPipe implements PipeTransform<string, string> {
    constructor(private encryptHelper: EncryptHelper) {}

    transform(value: string): string {
        return this.encryptHelper.decrypt(value);
    }
}
