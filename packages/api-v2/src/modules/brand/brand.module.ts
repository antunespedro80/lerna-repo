import { Module } from '@nestjs/common';
import { Brand } from './brand.model';

@Module({
    providers: [Brand],
})
export class BrandModule {}
