import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import tableNames from 'src/modules/database/objection/tableNames';
import { ClassifiedAccount } from '../classified_account/classified_account.model';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import { User } from '../user/user.model';

@ObjectType()
export class Gender extends Model {
    static tableName = tableNames.gender;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    name: string;

    static relationMappings() {
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.gender}.id`,
                    to: `${tableNames.user}.idGender`,
                },
            },
            classified_accounts: {
                relation: Model.HasManyRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableNames.gender}.id`,
                    to: `${tableNames.classified_account}.idGender`,
                },
            },
        };
    }
}
