import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderByArgs } from 'src/modules/shared/dto/orderBy.args';

export enum UserOrderByField {
    name = 'name',
    registerDate = 'registerDate',
}

registerEnumType(UserOrderByField, {
    name: 'UserOrderByField',
});

@InputType()
export class UserOrderByArgs extends OrderByArgs {
    @Field(() => UserOrderByField, {
        defaultValue: UserOrderByField.registerDate,
        nullable: true,
    })
    field: UserOrderByField;
}
