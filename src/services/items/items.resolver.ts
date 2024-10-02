import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ListItemFilterInput } from './dto/list-item.filter.input';
import { PaginatedItemList } from './entities/paginated.item.list.entity';
import { Observable } from 'rxjs';
import { pubSub } from '../../core/pubSub';
import { PaginatedEntity } from '@pieceowater-dev/lotof.lib.broadcaster';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput')
    createItemInput: CreateItemInput,
    @Context() ctx: any,
  ): Promise<Observable<Item>> {
    const item = this.itemsService.create(createItemInput);
    item.then(() => {
      pubSub.publish('itemMutated:' + ctx.requestId, { data: item });
    });
    return item;
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

  @Subscription(() => Item, {
    filter: (payload: any, variables: any) => {
      return variables.requestId === payload.requestId;
    },
  })
  async mutationResult(
    @Args('requestId', { type: () => String }) requestId: string,
  ) {
    return pubSub.asyncIterator('itemMutated:' + requestId);
  }
}
