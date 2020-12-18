import {
    Resolver,
    Query,
    Args,
    Parent,
    ResolveField,
    Mutation,
} from '@nestjs/graphql';
import { AuthGlobal } from '../auth/decorators/authGlobal.decorator';
import { CountryLoader } from '../country/country.loader';
import { Country } from '../country/country.model';
import { GenderLoader } from '../gender/gender.loader';
import { Gender } from '../gender/gender.model';
import { Decrypt } from '../helpers/decorators/decryptResolverField.decorator';
import { UserPaginatedArgs } from './dto/userPaginated.args';
import { UserPaginated } from './dto/userPaginated.dto';
import { UserType } from './enums/userTypes.enums';
import { User } from './user.model';
import { UserService } from './user.service';

@AuthGlobal(UserType.INFLUENCER)
@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly countryLoader: CountryLoader,
        private readonly genderLoader: GenderLoader,
    ) {}

    @AuthGlobal(UserType.ADMIN)
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

    @ResolveField('gender', () => Gender, { nullable: true })
    async gender(@Decrypt('idGender') @Parent() user: User) {
        if (user.idGender === null) return null;

        return this.genderLoader.findByIds.load(user.idGender);
    }

    @Mutation(() => UserPaginated, {
        name: 'mutation',
        description: 'Find all users',
    })
    mutation(@Args() args: UserPaginatedArgs) {
        return this.userService.findAll(args);
    }
}
