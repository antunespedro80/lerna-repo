import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { CountryLoader } from '../country/country.loader';
import { Country } from '../country/country.model';
import { Decrypt } from '../helpers/decorators/decryptResolverField.decorator';
import { UserPaginatedArgs } from './dto/userPaginated.args';
import { UserPaginated } from './dto/userPaginated.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly countryLoader: CountryLoader,
    ) {}

    @Query(() => UserPaginated, {
        name: 'users',
        description: 'Find all users',
    })
    findAll(@Args() args: UserPaginatedArgs) {
        return this.userService.findAll(args);
    }

    @ResolveField('country', () => Country, { nullable: true })
    async country(@Decrypt('idCountry') @Parent() user: User) {
        if (user.idCountry === null) return null;

        return this.countryLoader.findByIds.load(user.idCountry);
    }
}
