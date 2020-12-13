import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DecoratorHelper } from '../decorator.helper';

/**
 * Decrypt param from root
 * First param can be an array or string with the params name
 */
export const Decrypt = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const root = GqlExecutionContext.create(ctx).getRoot();
        const encryptHelper = DecoratorHelper.getEncryptHelper();
        if (Array.isArray(data)) {
            for (const d of data) {
                if (d in root && root[d] !== null && root[d] !== undefined) {
                    root[d] = encryptHelper.decryptToNumber(root[d]);
                }
            }
        } else if (
            typeof data === 'string' &&
            data in root &&
            root[data] !== null &&
            root[data] !== undefined
        ) {
            root[data] = encryptHelper.decryptToNumber(root[data]);
        }
        return root;
    },
);
