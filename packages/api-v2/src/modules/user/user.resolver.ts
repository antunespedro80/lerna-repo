import { Resolver, Query, Args } from '@nestjs/graphql';
import { DecryptPipe } from '../helpers/pipes/decrypt.pipe';
import { User } from './user';

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    async user(@Args('id', { type: () => String }, DecryptPipe) id: string) {
        //const user = new User();
        //user.name = 'Paulo';
        return { id: id, name: 'Paulo Maia' };
    }
}
