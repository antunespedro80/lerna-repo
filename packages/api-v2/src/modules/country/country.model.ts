import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { AuthField } from '../auth/decorators/authField.decorator';
import { Encrypt } from '../helpers/decorators/encrypt.decorator';
import { UserType } from '../user/enums/userTypes.enums';

@AuthField(UserType.BRAND)
@ObjectType()
export class Country extends Model {
    static tableName = 'country';
    static idColumn = 'id';

    @Encrypt()
    @Field(() => String)
    id: number;

    @AuthField(UserType.PUBLIC, UserType.ADMIN)
    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;
}
