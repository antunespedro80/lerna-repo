import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableNames from '../database/objection/tableNames';
import { CategoryAll } from '../category_all/category_all.model';
import { ClassifiedAccount } from '../classified_account/classified_account.model';

@ObjectType()
export class Category extends Model {
    static tableName = tableNames.category;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Encrypt()
    @Field(() => String)
    name: string;

    @Field(() => String)
    img: string;

    static relationMappings() {
        return {
            categories_all: {
                relation: Model.HasManyRelation,
                modelClass: CategoryAll,
                join: {
                    from: `${tableNames.category}.id`,
                    to: `${tableNames.category_all}.idCategory`,
                },
            },
            classified_accounts: {
                relation: Model.ManyToManyRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableNames.category}.id`,
                    through: {
                        from: `${tableNames.external_categories}.idCategory`,
                        to: `${tableNames.external_categories}.idClassifiedAccount`,
                    },
                    to: `${tableNames.classified_account}.id`,
                },
            },
        };
    }
}
