import { Global, Module } from '@nestjs/common';
import EncryptHelper from './encrypt.helper';

@Global()
@Module({
    providers: [EncryptHelper],
    exports: [EncryptHelper],
})
export class HelpersModule {}
