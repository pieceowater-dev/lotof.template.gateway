import { sendMessageToService } from '@pieceowater-dev/lotof.lib.broadcaster/dist/utils/sendMessage';
import { Inject, Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ListItemFilterInput } from './dto/list-item.filter.input';
import { Item } from './entities/item.entity';
import { PaginatedEntity } from '../utils/paginated.list/paginated.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ItemsService {
  constructor(@Inject('TEMPLATE_SERVICE') private client: ClientProxy) {}

  async create(createItemInput: CreateItemInput): Promise<Observable<Item>> {
    return sendMessageToService<Item, CreateItemInput>(
      this.client,
      'createItem',
      createItemInput,
    );
  }

  async findAll(
    listItemFilterInput: ListItemFilterInput,
  ): Promise<Observable<PaginatedEntity<Item>>> {
    return sendMessageToService<PaginatedEntity<Item>, ListItemFilterInput>(
      this.client,
      'findAllItem',
      listItemFilterInput,
    );
  }

  async findOne(id: number): Promise<Observable<Item>> {
    return sendMessageToService<Item, number>(this.client, 'findOneItem', id);
  }

  async update(
    id: number,
    updateItemInput: UpdateItemInput,
  ): Promise<Observable<Item>> {
    return sendMessageToService<
      Item,
      { id: number; updateItemInput: UpdateItemInput }
    >(this.client, 'updateItem', { id: id, updateItemInput: updateItemInput });
  }
}
