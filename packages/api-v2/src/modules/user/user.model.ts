import { Field, ObjectType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { Model } from 'objection';
import { Country } from '../country/country.model';
import EncryptFnDecorator from '../helpers/decorators/encryptFn.decorator';

@ObjectType()
export class User extends Model {
    static tableName = 'user';

    @Transform(EncryptFnDecorator)
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Transform(EncryptFnDecorator)
    @Field(() => String, { nullable: true })
    idCountry: number | null;

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
