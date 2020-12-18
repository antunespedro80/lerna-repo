import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { User } from '../user/user.model';
import tableNames from '../database/objection/tableNames';
import { Brand } from '../brand/brand.model';
import { ClassifiedAccount } from '../classified_account/classified_account.model';

@ObjectType()
export class Country extends Model {
    static tableName = tableName.country;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;

    static relationMappings() {
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.country}.id`,
                    to: `${tableNames.user}.idCountry`,
                },
            },
            brands: {
                relation: Model.HasManyRelation,
                modelClass: Brand,
                join: {
                    from: `${tableNames.country}.id`,
                    to: `${tableNames.brand}.idCountry`,
                },
            },
            /*classified_accounts: {
                relation: Model.HasManyRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableNames.country}.id`,
                    to: `${tableNames.classified_account}.idCountry`,
                },
            },*/
            classified_accounts: {
                relation: Model.ManyToManyRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableName.country}.id`,
                    through: {
                        from: `${tableName.external_countries}.idCountry`,
                        to: `${tableName.external_countries}.idClassifiedAccount`,
                    },
                    to: `${tableName.classified_account}.id`,
                },
            },
        };
    }
}
