import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { Subscription } from '../subscription/subscription.model';

@ObjectType()
export class Plan extends Model {
    static tableName = tableName.plan;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => Int)
    status: number;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idPlanTrial: number | null;

    @Field(() => Int)
    isTrial: number;

    @Field(() => Int)
    order: number;

    static relationMappings() {
        return {
            trial: {
                relation: Model.BelongsToOneRelation,
                modelClass: Plan,
                join: {
                    from: `${tableName.plan}.id`,
                    to: `${tableName.plan}.idPlanTrial`,
                },
            },
            plan: {
                relation: Model.HasOneRelation,
                modelClass: Plan,
                join: {
                    from: `${tableName.plan}.idPlanTrial`,
                    to: `${tableName.plan}.id`,
                },
            },
            subscriptions: {
                relation: Model.HasManyRelation,
                modelClass: Subscription,
                join: {
                    from: `${tableName.plan}.id`,
                    to: `${tableName.subscription}.idPlan`,
                },
            },
        };
    }
}
