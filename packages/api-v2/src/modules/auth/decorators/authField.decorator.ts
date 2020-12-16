import { Extensions } from '@nestjs/graphql';
import { UserType } from 'src/modules/user/enums/userTypes.enums';
import { AUTH_FIELD_KEY } from '../guards/objetAndFieldType.guard';

export type AtLeastOneType<T> = {
    0: T;
} & Array<T>;

export const AuthField = (...authTypes: AtLeastOneType<UserType>) => {
    return Extensions({ [AUTH_FIELD_KEY]: authTypes });
};
