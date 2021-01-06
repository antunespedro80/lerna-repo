import { InternalServerErrorException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGlobal } from '../auth/decorators/authGlobal.decorator';
import { NoAccess } from '../auth/exceptions/noAccess.exception';
import { FacebookService } from '../facebook/facebook.service';
import { SimpleResponse } from '../helpers/dto/simpleResponse.objectType';
import { UserType } from '../user/enums/userTypes.enums';

@AuthGlobal(UserType.PUBLIC)
@Resolver()
export class AuthFacebookResolver {
    constructor(private readonly facebookService: FacebookService) {}

    @Query(() => String)
    oauthUrl() {
        return this.facebookService.oauthUrl();
    }

    @Query(() => SimpleResponse)
    async getAccessToken(@Args('code', { type: () => String }) code: string) {
        const getAccessToken = await this.facebookService.getAccessToken(code);

        // Failed getting access token
        if (getAccessToken.isError) {
            throw new NoAccess('Something went wrong 1');
        }

        const token = getAccessToken.value.access_token;
        const validPermissions = await this.facebookService.validatePermissions(token);

        if (!validPermissions) {
            throw new NoAccess(
                'In order to help you, we need all the permissions that we asked for. Please, assign all permissions.',
            );
        }

        const infData = await this.facebookService.getDataNeededForInfluencerAuth(token);

        if (infData?.isError) {
            throw new NoAccess('Something went wrong 2');
        }

        return {
            response: token,
        };
    }
}
