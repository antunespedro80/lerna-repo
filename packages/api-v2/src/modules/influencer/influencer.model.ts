import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { User } from '../user/user.model';
import { ClassifiedAccountSocial } from '../classified_account_social/classified_account_social.model';

@ObjectType()
export class Influencer extends Model {
    static tableName = tableName.influencer;
    static idColumn = 'idUser';

    @Encrypt()
    @Field(() => String)
    idUser: number;

    @Field(() => String)
    username: string;

    @Field(() => Int)
    averageImpressions: number;

    @Field(() => Int)
    averageReach: number;

    @Field(() => Int)
    averageLikes: number;

    @Field(() => Int)
    averageComments: number;

    @Field(() => Float)
    engagementRate: number;

    @Field(() => Int)
    followers: number;

    @Field(() => String)
    address: string;

    @Field(() => String)
    town: string;

    @Field(() => String)
    postalCode: string;

    @Field(() => String)
    city: string;

    @Field(() => String, { nullable: true })
    iban: string | null;

    @Field(() => String, { nullable: true })
    accountHolder: string | null;

    @Field(() => Int, { nullable: true })
    score: number | null;

    static relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableName.influencer}.idUser`,
                    to: `${tableName.user}.id`,
                },
            },
            classified_account: {
                relation: Model.HasOneRelation,
                modelClass: ClassifiedAccountSocial,
                join: {
                    from: `${tableName.influencer}.idUser`,
                    to: `${tableName.classified_account_social}.idUser`,
                },
            },
        };
    }
}
