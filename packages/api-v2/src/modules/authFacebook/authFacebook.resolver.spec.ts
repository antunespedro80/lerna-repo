import { Test, TestingModule } from '@nestjs/testing';
import { AuthFacebookResolver } from './authFacebook.resolver';

describe('AuthFacebookResolver', () => {
    let resolver: AuthFacebookResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthFacebookResolver],
        }).compile();

        resolver = module.get<AuthFacebookResolver>(AuthFacebookResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
