import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableNames from '../database/objection/tableNames';
@ObjectType()
export class CategoryBrand extends Model {
    static tableName = tableNames.category_brand;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    name: string;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idParent: number | null;

    static relationMappings() {
        return {
            classified_accounts: {
                relation: Model.ManyToManyRelation,
                modelClass: CategoryBrand,
                join: {
                    from: `${tableNames.category_brand}.id`,
                    through: {
                        from: `${tableNames.external_categories_brand}.idCategoryBrand`,
                        to: `${tableNames.external_categories_brand}.idClassifiedAccount`,
                    },
                    to: `${tableNames.classified_account}.id`,
                },
            },
        };
    }
}
