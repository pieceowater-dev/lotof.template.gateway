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
    return this.client.send<Item, CreateItemInput>(
      'createItem',
      createItemInput,
    );
  }

  findAll(listItemFilterInput: ListItemFilterInput): PaginatedEntity<Item> {
    console.log('ItemsService findAll filter:', listItemFilterInput);
    return {
      rows: [
        { id: 1, name: 'Item1' },
        { id: 2, name: 'Item2' },
        { id: 3, name: 'Item3' },
      ],
      info: {
        count: 10,
      },
    };
  }

  findOne(id: number): Item {
    return { id: id, name: 'Some Item' };
  }

  update(id: number, updateItemInput: UpdateItemInput): Item {
    return { id: id, name: updateItemInput.name ?? 'Item' };
  }
}
