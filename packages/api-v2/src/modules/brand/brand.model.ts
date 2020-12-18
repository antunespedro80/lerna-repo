import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Country } from 'src/modules/country/country.model';
import { Encrypt } from 'src/modules/helpers/decorators/encrypt.decorator';
import tableName from '../database/objection/tableNames';
import { Person } from '../person/person.model';

@ObjectType()
export class Brand extends Model {
    static tableName = tableName.brand;
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @Field(() => String, { nullable: true })
    idOwner: number | null;

    @Field(() => String)
    name: string;

    @Field(() => Int, { nullable: true })
    email: number | null;

    @Field(() => Int, { nullable: true })
    logo: number | null;

    @Encrypt()
    @Field(() => String, { nullable: true })
    idCountry: number | null;

    @Field(() => String, { nullable: true })
    website: string | null;

    @Field(() => Int)
    status: number;

    @Field(() => Int)
    creationDate: number;

    static relationMappings() {
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: Person,
                join: {
                    from: `${tableName.brand}.idOwner`,
                    to: `${tableName.person}.idUser`,
                },
            },
            country: {
                relation: Model.BelongsToOneRelation,
                modelClass: Country,
                join: {
                    from: `${tableName.brand}.idCountry`,
                    to: `${tableName.country}.id`,
                },
            },
        };
    }
}
