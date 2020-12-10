import { PipeTransform, Injectable } from '@nestjs/common';
import EncryptHelper from '../encrypt.helper';

@Injectable()
export class DecryptPipe implements PipeTransform<string, string> {
    constructor(private encryptHelper: EncryptHelper) {}

    transform(value: string): string {
        /*const val = parseInt(value, 10);
        if (isNaN(val)) {
          throw new BadRequestException('Validation failed');
        }*/
        return value + this.encryptHelper.decrypt('ok');
    }
}
