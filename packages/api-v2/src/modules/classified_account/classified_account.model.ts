import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableNames from '../database/objection/tableNames';
import { User } from '../user/user.model';
import { Country } from '../country/country.model';
import { Gender } from '../gender/gender.model';
import { ClassifiedAccountSocial } from '../classified_account_social/classified_account_social.model';
import { Language } from '../language/language.model';
import { Category } from '../category/category.model';
import { CategoryAll } from '../category_all/category_all.model';
import { CategoryBrand } from '../category_brand/category_brand.model';

@ObjectType()
export class ClassifiedAccount extends Model {
    static tableName = tableNames.classified_account;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String, { nullable: true })
    idUser: number | null;

    @Field(() => String, { nullable: true })
    name: string | null;

    @Field(() => String, { nullable: true })
    profile: string | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idCountry: number | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idGender: number | null;

    @Field(() => Int, { nullable: true })
    isBrand: number | null;

    @Field(() => Int)
    status: number;

    @Field(() => Int, { nullable: true })
    birthDate: number | null;

    @Field(() => Int, { nullable: true })
    validated: number | null;

    @Field(() => Int, { nullable: true })
    score: number | null;

    @Field(() => String, { nullable: true })
    suggestedData: string | null;

    static relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.classified_account}.idUser`,
                    to: `${tableNames.user}.id`,
                },
            },
            /*country: {
                relation: Model.BelongsToOneRelation,
                modelClass: Country,
                join: {
                    from: `${tableName.classified_account}.idCountry`,
                    to: `${tableName.country}.id`,
                },
            },*/
            gender: {
                relation: Model.BelongsToOneRelation,
                modelClass: Gender,
                join: {
                    from: `${tableNames.classified_account}.idGender`,
                    to: `${tableNames.gender}.id`,
                },
            },
            classified_account_social: {
                relation: Model.HasOneRelation,
                modelClass: ClassifiedAccountSocial,
                join: {
                    from: `${tableNames.classified_account}.id`,
                    to: `${tableNames.classified_account_social}.idClassifiedAccount`,
                },
            },
            external_countries: {
                relation: Model.ManyToManyRelation,
                modelClass: Country,
                join: {
                    from: `${tableNames.classified_account}.id`,
                    through: {
                        from: `${tableNames.external_countries}.idClassifiedAccount`,
                        to: `${tableNames.external_countries}.idCountry`,
                    },
                    to: `${tableNames.country}.id`,
                },
            },
            external_laguages: {
                relation: Model.ManyToManyRelation,
                modelClass: Language,
                join: {
                    from: `${tableNames.classified_account}.id`,
                    through: {
                        from: `${tableNames.external_languages}.idClassifiedAccount`,
                        to: `${tableNames.external_languages}.idLanguage`,
                    },
                    to: `${tableNames.language}.id`,
                },
            },
            external_categories: {
                relation: Model.ManyToManyRelation,
                modelClass: Category,
                join: {
                    from: `${tableNames.classified_account}.id`,
                    through: {
                        from: `${tableNames.external_categories}.idClassifiedAccount`,
                        to: `${tableNames.external_categories}.idCategory`,
                    },
                    to: `${tableNames.category}.id`,
                },
            },
            external_categories_all: {
                relation: Model.ManyToManyRelation,
                modelClass: CategoryAll,
                join: {
                    from: `${tableNames.classified_account}.id`,
                    through: {
                        from: `${tableNames.external_categories_all}.idClassifiedAccount`,
                        to: `${tableNames.external_categories_all}.idCategoryAll`,
                    },
                    to: `${tableNames.category_all}.id`,
                },
            },
            external_categories_brand: {
                relation: Model.ManyToManyRelation,
                modelClass: CategoryBrand,
                join: {
                    from: `${tableNames.classified_account}.id`,
                    through: {
                        from: `${tableNames.external_categories_brand}.idClassifiedAccount`,
                        to: `${tableNames.external_categories_brand}.idCategoryBrand`,
                    },
                    to: `${tableNames.category_brand}.id`,
                },
            },
        };
    }
}
