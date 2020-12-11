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

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schemas/schema.gql'),
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
    ],
    providers: [],
})
export class AppModule {}
