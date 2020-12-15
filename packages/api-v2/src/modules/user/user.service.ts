import { Inject, Injectable } from '@nestjs/common';
import { UserPaginatedArgs } from './dto/userPaginated.args';
import { UserPaginated } from './dto/userPaginated.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@Inject(User) private readonly userModel: typeof User) {}

    async findById(id: number) {
        return this.userModel.query().findById(id);
    }

    async findAll(args: UserPaginatedArgs) {
        const query = this.userModel.query();
        const [total, items] = await Promise.all([
            args.offset === 0 ? query.resultSize() : null,
            query
                .offset(args.offset)
                .limit(args.limit)
                .orderBy(args.orderBy.field, args.orderBy.direction),
        ]);

        return new UserPaginated({ total, items });
    }
}
