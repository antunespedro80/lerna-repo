import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer/decorators';
import { Model } from 'objection';
import EncryptFnDecorator from '../helpers/decorators/encryptFn.decorator';

@ObjectType()
export class Country extends Model {
    static tableName = 'country';
    static idColumn = 'id';

    @Transform(EncryptFnDecorator)
    @Field(() => String)
    id: number;

    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;
}
