import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserType } from 'src/modules/user/enums/userTypes.enums';

export const AUTH_GLOBAL_KEY = 'authGlobalKey';

@Injectable()
export class GlobalGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const contextGpl = GqlExecutionContext.create(context);
        const requiredRoles = this.reflector.getAllAndMerge<UserType[]>(
            AUTH_GLOBAL_KEY,
            [context.getHandler(), context.getClass()],
        );

        console.log('Global Guard', requiredRoles);

        return true;
    }
}
