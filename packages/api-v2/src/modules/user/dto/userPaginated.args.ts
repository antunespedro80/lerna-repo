import { ArgsType, Field } from '@nestjs/graphql';
import PaginatedArgs from 'src/modules/shared/dto/paginated.args';
import { UserOrderByArgs } from './userOrderBy.args';

@ArgsType()
export class UserPaginatedArgs extends PaginatedArgs {
    @Field(() => UserOrderByArgs)
    orderBy: UserOrderByArgs;
}
