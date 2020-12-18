import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { ClassifiedAccount } from '../classified_account/classified_account.model';
import { Influencer } from '../influencer/influencer.model';
import { User } from '../user/user.model';
import { Social } from '../social/social.model';

@ObjectType()
export class ClassifiedAccountSocial extends Model {
    static tableName = tableName.classified_account_social;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idClassifiedAccount: number | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idUser: string | null;

    @Field(() => Int)
    status: number;

    @Encrypt()
    @Field(() => String)
    sType: number;

    @Encrypt()
    @Field(() => String)
    idUserSocial: number;

    token: string | null;

    validToken: number | null;

    @Field(() => String)
    username: string;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idBusiness: number | null;

    secondToken: string | null;

    secondValidToken: number | null;

    @Field(() => Int, { nullable: true })
    instaLastTimeHelper: number | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idSocialRegisterAccount: string | null;

    @Field(() => Int, { nullable: true })
    avgLikes: number | null;

    @Field(() => Int, { nullable: true })
    avgComments: number | null;

    @Field(() => Int, { nullable: true })
    followers: number | null;

    @Field(() => Float, { nullable: true })
    engRage: number | null;

    @Field(() => Int, { nullable: true })
    hasAnalytics: number | null;

    @Field(() => Int, { nullable: true })
    lastDayAnalytics: number | null;

    @Field(() => Int, { nullable: true })
    lastDateNotificationInvalidToken: number | null;

    static relationMappings() {
        return {
            classified_account: {
                relation: Model.BelongsToOneRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableName.classified_account_social}.idClassifiedAccount`,
                    to: `${tableName.classified_account}.id`,
                },
            },
            influencer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Influencer,
                join: {
                    from: `${tableName.classified_account_social}.idUser`,
                    to: `${tableName.influencer}.idUser`,
                },
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableName.classified_account_social}.idUser`,
                    to: `${tableName.user}.id`,
                },
            },
            social: {
                relation: Model.BelongsToOneRelation,
                modelClass: Social,
                join: {
                    from: `${tableName.classified_account_social}.sType`,
                    to: `${tableName.social}.id`,
                },
            },
        };
    }
}
