import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { Person } from '../person/person.model';
import { Plan } from '../plan/plan.model';
import { PlanPayPeriod } from '../plan_pay_period/plan_pay_period.model';

@ObjectType()
export class Subscription extends Model {
    static tableName = tableName.subscription;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String, { nullable: true })
    date: number | null;

    @Encrypt()
    @Field(() => String)
    idPerson: number;

    @Encrypt()
    @Field(() => String)
    idPlan: number;

    @Encrypt()
    @Field(() => String)
    idPlanPayPeriod: number;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idDiscount: number | null;

    @Field(() => Int)
    dateStart: number;

    @Field(() => Int)
    dateEnd: number;

    @Encrypt()
    @Field(() => Int)
    idCurrency: number;

    @Encrypt()
    @Field(() => Int)
    idCountry: number;

    @Field(() => Float)
    price: number;

    @Field(() => Int)
    status: number;

    static relationMappings() {
        return {
            persons: {
                relation: Model.HasManyRelation,
                modelClass: Person,
                join: {
                    from: `${tableName.subscription}.id`,
                    to: `${tableName.person}.idSubscription`,
                },
            },
            plan: {
                relation: Model.BelongsToOneRelation,
                modelClass: Plan,
                join: {
                    from: `${tableName.subscription}.id`,
                    to: `${tableName.plan}.idSubscription`,
                },
            },
            plan_pay_period: {
                relation: Model.BelongsToOneRelation,
                modelClass: PlanPayPeriod,
                join: {
                    from: `${tableName.subscription}.idPlanPayPeriod`,
                    to: `${tableName.plan_pay_period}.id`,
                },
            },
            // TODO: idDiscount, idCurrency, idCountry
        };
    }
}
