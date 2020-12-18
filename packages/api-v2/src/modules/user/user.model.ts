import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Referral } from 'src/modules/referral/referral.model';
import { Country } from '../country/country.model';
import { Gender } from '../gender/gender.model';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import { Language } from '../language/language.model';
import tableName from '../database/objection/tableNames';
import { Influencer } from '../influencer/influencer.model';
import { ClassifiedAccount } from '../classified_account/classified_account.model';
import { ClassifiedAccountSocial } from '../classified_account_social/classified_account_social.model';
import { Session } from '../session/session.model';

@ObjectType()
export class User extends Model {
    static tableName = tableName.user;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => Int)
    type: number;

    @Field(() => String, { nullable: true })
    name: string | null;

    password: string | null;

    @Field(() => String, { nullable: true })
    email: string | null;

    @Field(() => Int)
    status: number;

    @Field(() => Int, { nullable: true })
    birthDate: number | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idGender: number | null;

    @Field(() => String, { nullable: true })
    phoneNumber: string | null;

    @Field(() => Int, { nullable: true })
    registerDate: number | null;

    @Field(() => String, { nullable: true })
    profileImg: string | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idLanguage: number | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idCountry: number | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idReferral: number | null;

    @Field(() => Int, { nullable: true })
    loginDisable: number | null;

    static relationMappings() {
        return {
            gender: {
                relation: Model.BelongsToOneRelation,
                modelClass: Gender,
                join: {
                    from: `${tableName.user}.idGender`,
                    to: `${tableName.gender}.id`,
                },
            },
            language: {
                relation: Model.BelongsToOneRelation,
                modelClass: Language,
                join: {
                    from: `${tableName.user}.idLanguage`,
                    to: `${tableName.language}.id`,
                },
            },
            country: {
                relation: Model.BelongsToOneRelation,
                modelClass: Country,
                join: {
                    from: `${tableName.user}.idCountry`,
                    to: `${tableName.country}.id`,
                },
            },
            referral: {
                relation: Model.BelongsToOneRelation,
                modelClass: Referral,
                join: {
                    from: `${tableName.user}.idReferral`,
                    to: `${tableName.referral}.id`,
                },
            },
            influencer: {
                relation: Model.HasOneRelation,
                modelClass: Influencer,
                join: {
                    from: `${tableName.user}.id`,
                    to: `${tableName.influencer}.idUser`,
                },
            },
            classified_account: {
                relation: Model.HasOneRelation,
                modelClass: ClassifiedAccount,
                join: {
                    from: `${tableName.user}.id`,
                    to: `${tableName.classified_account}.idUser`,
                },
            },
            classified_account_social: {
                relation: Model.HasOneRelation,
                modelClass: ClassifiedAccountSocial,
                join: {
                    from: `${tableName.user}.id`,
                    to: `${tableName.classified_account_social}.idUser`,
                },
            },
            sessions: {
                relation: Model.HasManyRelation,
                modelClass: Session,
                join: {
                    from: `${tableName.user}.id`,
                    to: `${tableName.session}.idUser`,
                },
            },
        };
    }
}
