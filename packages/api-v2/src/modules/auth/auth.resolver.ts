import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/user';
import AuthArgs from './dto/auth.args';

@Resolver()
export class AuthResolver {
    @Query(() => User)
    async login(@Args() args: AuthArgs) {
        return {
            name: args.email,
            id: 1,
        };
    }
}
