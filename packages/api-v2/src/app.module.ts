import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { AuthModule } from './modules/auth/auth.module';
import { ObjectionModule } from './modules/database/objection/objection.module';
import { ConfigService } from '@nestjs/config';
import { CountryModule } from './modules/country/country.module';
import { ReferralResolver } from './modules/referral/referral.resolver';
import { ReferralService } from './modules/referral/referral.service';
import { ReferralModule } from './modules/referral/referral.module';
import { GenderResolver } from './modules/gender/gender.resolver';
import { BrandModule } from './modules/brand/brand.module';
import { BrandService } from './modules/brand/brand.service';
import { BrandResolver } from './modules/brand/brand.resolver';
import { PlanResolver } from './modules/plan/plan.resolver';
import { PlanService } from './modules/plan/plan.service';
import { PlanModule } from './modules/plan/plan.module';
import { ClassifiedAccountResolver } from './modules/classified_account/classified_account.resolver';
import { ClassifiedAccountModule } from './modules/classified_account/classified_account.module';
import { ClassifiedAccountService } from './modules/classified_account/classified_account.service';

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schemas/schema.gql'),
            //https://docs.nestjs.com/graphql/other-features#execute-enhancers-at-the-field-resolver-level & https://github.com/nestjs/graphql/issues/295
            fieldResolverEnhancers: ['interceptors'],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ObjectionModule.registerAsync({
            inject: [ConfigService],
            useFactory(config: ConfigService) {
                return {
                    config: {
                        client: 'mysql',
                        connection: {
                            host: config.get<string>('MYSQL_HOST') || '',
                            port: config.get<string>('MYSQL_PORT') || '',
                            user: config.get<string>('MYSQL_USER') || '',
                            password:
                                config.get<string>('MYSQL_PASSWORD') || '',
                            database:
                                config.get<string>('MYSQL_DATABASE') || '',
                        },
                        //...knexSnakeCaseMappers(),
                    },
                };
            },
        }),
        UserModule,
        HelpersModule,
        AuthModule,
        CountryModule,
        ReferralModule,
        BrandModule,
        PlanModule,
        ClassifiedAccountModule,
    ],
    providers: [
        ReferralResolver,
        ReferralService,
        BrandResolver,
        BrandService,
        GenderResolver,
        PlanResolver,
        PlanService,
    ],
})
export class AppModule {}
