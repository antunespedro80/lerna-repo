import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import tableNames from 'src/modules/database/objection/tableNames';
import { ClassifiedAccount } from '../classified_account/classified_account.model';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import { User } from '../user/user.model';

@ObjectType()
export class Language extends Model {
    static tableName = tableNames.language;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    native: string;

    static relationMappings() {
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.language}.id`,
                    to: `${tableNames.user}.idLanguage`,
                },
            },
            classified_accounts: {
                relation: Model.ManyToManyRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableNames.language}.id`,
                    through: {
                        from: `${tableNames.external_languages}.idLanguage`,
                        to: `${tableNames.external_languages}.idClassifiedAccount`,
                    },
                    to: `${tableNames.classified_account}.id`,
                },
            },
        };
    }
}
