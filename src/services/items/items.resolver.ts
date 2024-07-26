import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ListItemFilterInput } from './dto/list-item.filter.input';
import { PaginatedItemList } from './entities/paginated.item.list.entity';
import { PaginatedEntity } from '../utils/paginated.list/paginated.entity';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(
    @Args('createItemInput')
    createItemInput: CreateItemInput,
  ) {
    return this.itemsService.create(createItemInput);
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput')
    updateItemInput: UpdateItemInput,
  ) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Query(() => PaginatedItemList, { name: 'items' })
  findAll(
    @Args('filter')
    listItemFilterInput: ListItemFilterInput,
  ): PaginatedEntity<Item> {
    return this.itemsService.findAll(listItemFilterInput);
  }

  @Query(() => Item, { name: 'item' })
  findOne(
    @Args('id', { type: () => Int })
    id: number,
  ) {
    return this.itemsService.findOne(id);
  }
}
