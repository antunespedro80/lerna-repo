import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/modules/user/enums/userTypes.enums';
import { AUTH_GLOBAL_KEY } from '../guards/global.guard';
import { AtLeastOneType } from './authField.decorator';

export const AuthGlobal = (...authTypes: AtLeastOneType<UserType>) =>
    SetMetadata(AUTH_GLOBAL_KEY, authTypes);
