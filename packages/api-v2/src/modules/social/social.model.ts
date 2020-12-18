import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { ClassifiedAccountSocial } from '../classified_account_social/classified_account_social.model';

@ObjectType()
export class Social extends Model {
    static tableName = tableName.social;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    url: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    logo: string;

    @Field(() => Int)
    status: number;

    static relationMappings() {
        return {
            classified_accounts_social: {
                relation: Model.HasManyRelation,
                modelClass: ClassifiedAccountSocial,
                join: {
                    from: `${tableName.social}.id`,
                    to: `${tableName.classified_account_social}.sType`,
                },
            },
        };
    }
}
