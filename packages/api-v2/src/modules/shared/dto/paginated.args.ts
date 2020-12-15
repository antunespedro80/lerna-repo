import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export default class PaginatedArgs {
    @Min(0)
    @Field(() => Int, { nullable: true, defaultValue: 0 })
    offset: number;

    @Min(1)
    @Max(20)
    @Field(() => Int, { nullable: true, defaultValue: 20 })
    limit: number;
}
