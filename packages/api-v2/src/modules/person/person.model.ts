import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import { Model } from 'objection';
import { Brand } from '../brand/brand.model';
import tableName from '../database/objection/tableNames';
import { Subscription } from '../subscription/subscription.model';

@ObjectType()
export class Person extends Model {
    static tableName = tableName.person;
    static idColumn = ['idUser', 'idSubscription'];

    @Encrypt()
    @Field(() => String)
    idUser: number;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idSubscription: number | null;

    @Field(() => Int)
    alreadyDidTrial: number;

    @Field(() => Int)
    payByDays: number;

    static relationMappings() {
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: Brand,
                join: {
                    from: `${tableName.person}.idUser`,
                    to: `${tableName.brand}.idOwner`,
                },
            },
            subscription: {
                relation: Model.BelongsToOneRelation,
                modelClass: Subscription,
                join: {
                    from: `${tableName.person}.idSubscription`,
                    to: `${tableName.subscription}.id`,
                },
            },
        };
    }
}
