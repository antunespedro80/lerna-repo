import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';

@ObjectType()
export class User extends Model {
    static tableName = 'user';

    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;
}
