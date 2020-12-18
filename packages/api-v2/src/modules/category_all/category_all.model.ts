import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableNames from '../database/objection/tableNames';
import { Category } from '../category/category.model';
import { ClassifiedAccount } from '../classified_account/classified_account.model';

@ObjectType()
export class CategoryAll extends Model {
    static tableName = tableNames.category_all;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    name: string;

    @Encrypt()
    @Field(() => String)
    idCategory: number;

    @Field(() => String)
    img: string;

    static relationMappings() {
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: `${tableNames.category_all}.idCategory`,
                    to: `${tableNames.category}.id`,
                },
            },
            classified_accounts: {
                relation: Model.ManyToManyRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableNames.category}.id`,
                    through: {
                        to: `${tableNames.external_categories_all}.idCategoryAll`,
                        from: `${tableNames.external_categories_all}.idClassifiedAccount`,
                    },
                    to: `${tableNames.classified_account}.id`,
                },
            },
        };
    }
}
