import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class AuthArgs {
    @IsEmail()
    @Field(() => String)
    email: string;

    @IsNotEmpty()
    @Field(() => String)
    password: string;
}
