import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ListItemFilterInput } from './dto/list-item.filter.input';
import { PaginatedItemList } from './entities/paginated.item.list.entity';
import { Observable } from 'rxjs';
import { PaginatedEntity } from '@pieceowater-dev/lotof.lib.broadcaster/utils/pagination/entity.pagination';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput')
    createItemInput: CreateItemInput,
  ): Promise<Observable<Item>> {
    return this.itemsService.create(createItemInput);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput')
    updateItemInput: UpdateItemInput,
  ): Promise<Observable<Item>> {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Query(() => PaginatedItemList, { name: 'items' })
  async findAll(
    @Args('filter')
    listItemFilterInput: ListItemFilterInput,
  ): Promise<Observable<PaginatedEntity<Item>>> {
    return this.itemsService.findAll(listItemFilterInput);
  }

  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<Observable<Item>> {
    return this.itemsService.findOne(id);
  }
}
