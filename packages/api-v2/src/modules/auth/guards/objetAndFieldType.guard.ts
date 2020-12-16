import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
    GraphQLField,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLOutputType,
    GraphQLResolveInfo,
    GraphQLScalarType,
} from 'graphql';
import * as graphqlFields from 'graphql-fields';

export const AUTH_FIELD_KEY = 'authFieldKey';

/**
 * VALIDATES @ObjectType() and @Field() types
 */
@Injectable()
export class ObjectAndFieldTypeGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const contextGpl = GqlExecutionContext.create(context);
        const info = contextGpl.getInfo<GraphQLResolveInfo>();

        this.drillDownSchema(info.returnType, graphqlFields(info));

        return true;
    }

    /**
     * Function that recursively navigates through the schema to find each type and check if has extensions defined or not.
     * Only checks types or objects that were sent in this request, this is assured by the package graphql-fields
     * @param returnType
     * @param requestedFields
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drillDownSchema(
        returnType: GraphQLOutputType,
        requestedFields: any,
    ): unknown {
        if (returnType instanceof GraphQLNonNull) {
            console.log('noNull', returnType);
            return this.drillDownSchema(returnType.ofType, requestedFields);
        } else if (returnType instanceof GraphQLList) {
            console.log('list', returnType);
            return this.drillDownSchema(returnType.ofType, requestedFields);
        } else if (returnType instanceof GraphQLObjectType) {
            console.log('obj', returnType);
            this.validateObject(returnType);

            const fields = returnType.getFields();
            Object.entries(fields)
                .filter(([key]) => key in requestedFields)
                //.map(([_, field]) => field)
                ////.filter((field) => field.extensions && field.extensions.role)
                .forEach(([key, field]) => {
                    this.validateField(field);
                    //console.log(field);
                    console.log('FIELDS', requestedFields);
                    return this.drillDownSchema(
                        field.type,
                        requestedFields[key],
                    );
                });
        } else if (returnType instanceof GraphQLScalarType) {
            console.log('scalar', returnType.name);
        } else {
            console.log('unknown', returnType);
        }
    }

    validateField(field: GraphQLField<unknown, unknown>) {
        console.log('👌 validate field', field.name, field.extensions);
    }

    validateObject(object: GraphQLObjectType) {
        console.log('👌 validate object', object.name, object.extensions);
    }
}
