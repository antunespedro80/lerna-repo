import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { Subscription } from '../subscription/subscription.model';

@ObjectType()
export class PlanPayPeriod extends Model {
    static tableName = tableName.plan_pay_period;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => Int, { nullable: true })
    discount: number | null;

    @Field(() => Int)
    duration: number;

    @Field(() => Int)
    status: number;

    @Field(() => Int)
    order: number;

    static relationMappings() {
        return {
            subscriptions: {
                relation: Model.HasManyRelation,
                modelClass: Subscription,
                join: {
                    from: `${tableName.plan_pay_period}.id`,
                    to: `${tableName.subscription}.idPlanPayPeriod`,
                },
            },
        };
    }
}
