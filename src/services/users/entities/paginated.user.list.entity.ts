import { ObjectType } from '@nestjs/graphql';
import { PaginatedList } from '../../utils/paginated.list/paginated.list';
import { User } from './user.entity';

@ObjectType()
export class PaginatedUserList extends PaginatedList(User) {}
