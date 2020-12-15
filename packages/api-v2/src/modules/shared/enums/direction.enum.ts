import { registerEnumType } from '@nestjs/graphql';

export enum DirectionEnum {
    ASC = 'asc',
    DESC = 'desc',
}

registerEnumType(DirectionEnum, {
    name: 'Direction',
});
