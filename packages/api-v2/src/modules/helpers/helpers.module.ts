import { Global, Module } from '@nestjs/common';
import { DecoratorHelper } from './decorator.helper';
import { EncryptHelper } from './encrypt.helper';

@Global()
@Module({
    providers: [EncryptHelper, DecoratorHelper],
    exports: [EncryptHelper, DecoratorHelper],
})
export class HelpersModule {}
