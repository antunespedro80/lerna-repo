import { Module } from '@nestjs/common';
import { Referral } from './referral.model';

@Module({
    providers: [Referral],
})
export class ReferralModule {}
