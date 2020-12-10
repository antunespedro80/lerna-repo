import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { DecryptPipe } from '../helpers/pipes/decrypt.pipe';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => User)
    async user(@Args('id', { type: () => String }, DecryptPipe) id: string) {
        const user = await this.userService.findById(1);
        //const user = new User();
        //user.name = 'Paulo';
        return user;
    }
}
