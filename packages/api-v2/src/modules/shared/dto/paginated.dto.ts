import { Type as TypeFormat } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

/**
 * Helper interface to be able to return with type indentation
 */
export interface IPaginated<T> {
    items: T[];
    total: number | null;
}

/**
 * Helper interface to be able to return with type indentation
 */
export interface TypePaginatedReturn<T> extends Function {
    new (...args: IPaginated<unknown>[]): T;
}

/**
 * Generic type for paginated data
 * @param classRef
 */
export function Paginated<T>(
    classRef: TypeFormat<T>,
): TypePaginatedReturn<IPaginated<T>> {
    @ObjectType({ isAbstract: true })
    class PaginatedType {
        constructor(data: unknown) {
            Object.assign(this, data);
        }
        @Type(() => classRef)
        @Field(() => [classRef], { nullable: true })
        items: T[];

        @Field(() => Int, { nullable: true })
        total: number | null;
    }
    return PaginatedType;
}
