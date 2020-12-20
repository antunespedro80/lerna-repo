import { Module } from '@nestjs/common';
import { Referral } from './referral.model';
import { ReferralResolver } from './referral.resolver';

@Module({
    providers: [ReferralResolver, Referral],
})
export class ReferralModule {}
