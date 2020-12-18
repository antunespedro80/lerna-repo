import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { User } from '../user/user.model';

@ObjectType()
export class Session extends Model {
    static tableName = tableName.session;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Encrypt()
    @Field(() => String)
    idUser: number;

    @Field(() => String)
    ipAddress: string;

    @Field(() => String)
    userAgent: string;

    @Field(() => Int)
    dateCreated: number;

    @Field(() => Int)
    dateExpires: number;

    @Field(() => Int)
    status: number;

    static relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableName.session}.idUser`,
                    to: `${tableName.user}.id`,
                },
            },
        };
    }
}
