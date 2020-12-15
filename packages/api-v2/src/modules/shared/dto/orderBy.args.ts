import { Field, InputType } from '@nestjs/graphql';
import { DirectionEnum } from '../enums/direction.enum';

@InputType({ isAbstract: true })
export abstract class OrderByArgs {
    @Field(() => DirectionEnum, {
        defaultValue: DirectionEnum.DESC,
        nullable: true,
    })
    direction: DirectionEnum;
}
