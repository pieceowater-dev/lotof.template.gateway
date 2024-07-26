import { ObjectType } from '@nestjs/graphql';
import { PaginatedList } from '../../utils/paginated.list/paginated.list';
import { Item } from './item.entity';

@ObjectType()
export class PaginatedItemList extends PaginatedList(Item) {}
