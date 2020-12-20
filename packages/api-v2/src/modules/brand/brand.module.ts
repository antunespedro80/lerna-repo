import { Module } from '@nestjs/common';
import { Brand } from './brand.model';
import { BrandResolver } from './brand.resolver';

@Module({
    providers: [BrandResolver, Brand],
})
export class BrandModule {}
