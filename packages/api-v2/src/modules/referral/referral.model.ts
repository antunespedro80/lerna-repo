import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import tableNames from 'src/modules/database/objection/tableNames';
import { Encrypt } from 'src/modules/helpers/decorators/encrypt.decorator';
import { User } from 'src/modules/user/user.model';

@ObjectType()
export class Referral extends Model {
    static tableName = tableNames.referral;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    code: string;

    @Field(() => Int)
    validForm: number;

    @Field(() => Int)
    validUntil: number;

    static relationMappings() {
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.referral}.id`,
                    to: `${tableNames.user}.idReferral`,
                },
            },
        };
    }
}
