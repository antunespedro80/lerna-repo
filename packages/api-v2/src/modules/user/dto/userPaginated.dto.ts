import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/modules/shared/dto/paginated.dto';
import { User } from '../user.model';

@ObjectType()
export class UserPaginated extends Paginated(User) {}
