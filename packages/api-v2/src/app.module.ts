import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { AuthModule } from './modules/auth/auth.module';

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
        UserModule,
        HelpersModule,
        AuthModule,
    ],
    providers: [],
})
export class AppModule {}
