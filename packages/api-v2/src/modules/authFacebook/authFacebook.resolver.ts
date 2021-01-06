import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGlobal } from '../auth/decorators/authGlobal.decorator';
import { FacebookService } from '../facebook/facebook.service';
import { UserType } from '../user/enums/userTypes.enums';

@AuthGlobal(UserType.PUBLIC)
@Resolver()
export class AuthFacebookResolver {
    constructor(private readonly facebookService: FacebookService) {}

    @Query(() => String)
    oauthUrl() {
        return this.facebookService.oauthUrl();
    }

    @Query(() => String)
    accessTokenUrl(@Args('code', { type: () => String }) code: string) {
        return this.facebookService.accessTokenUrl(code);
    }
}
