import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Country } from '../country/country.model';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';

@ObjectType()
export class User extends Model {
    static tableName = 'user';

    @Encrypt()
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idCountry: number | null;

    @Field(() => Int)
    registerDate: number;

    static relationMappings() {
        return {
            country: {
                relation: Model.HasOneRelation,
                modelClass: Country,
                join: {
                    from: 'user.idCountry',
                    to: 'country.id',
                },
            },
        };
    }
}
