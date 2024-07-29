import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ListItemFilterInput } from './dto/list-item.filter.input';
import { Item } from './entities/item.entity';
import { PaginatedEntity } from '../utils/paginated.list/paginated.entity';
import { Observable } from 'rxjs';
import { GateMicroservicesProvider } from '../../core/microservices/microservices.provider';

@Injectable()
export class ItemsService {
  constructor(private templateProvider: GateMicroservicesProvider) {}

  async create(createItemInput: CreateItemInput): Promise<Observable<Item>> {
    return this.templateProvider.sendWithTimeout<Item, CreateItemInput>(
      'createItem',
      createItemInput,
    );
  }

  async findAll(
    listItemFilterInput: ListItemFilterInput,
  ): Promise<Observable<PaginatedEntity<Item>>> {
    return this.templateProvider.sendWithTimeout<
      PaginatedEntity<Item>,
      ListItemFilterInput
    >('findAllItem', listItemFilterInput);
  }

  async findOne(id: number): Promise<Observable<Item>> {
    return this.templateProvider.sendWithTimeout<Item, number>(
      'findOneItem',
      id,
    );
  }

  async update(
    id: number,
    updateItemInput: UpdateItemInput,
  ): Promise<Observable<Item>> {
    return this.templateProvider.sendWithTimeout<Item, UpdateItemInput>(
      'updateItem',
      {
        id: id,
        ...updateItemInput,
      },
    );
  }
}
