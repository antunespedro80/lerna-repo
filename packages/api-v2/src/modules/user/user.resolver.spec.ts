import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectionModule } from '../database/objection/objection.module';
import { HelpersModule } from '../helpers/helpers.module';
import { User } from './user.model';
import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
    let resolver: UserResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserResolver],
            imports: [
                HelpersModule,
                ObjectionModule.forFeature([User]),
                ConfigModule.forRoot({ isGlobal: true }),
            ],
        }).compile();

        resolver = module.get<UserResolver>(UserResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
