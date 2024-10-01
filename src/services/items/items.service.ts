import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ListItemFilterInput } from './dto/list-item.filter.input';
import { Item } from './entities/item.entity';
import { Observable } from 'rxjs';
import { TemplateGateMicroservicesProvider } from '../../core/microservices/microservices.template-provider';
import { PaginatedEntity } from '@pieceowater-dev/lotof.lib.broadcaster/utils/pagination/entity.pagination';

@Injectable()
export class ItemsService {
  constructor(private templateProvider: TemplateGateMicroservicesProvider) {}

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

  async findOne(itemId: number): Promise<Observable<Item>> {
    return this.templateProvider.sendWithTimeout<Item, { id: number }>(
      'findOneItem',
      { id: itemId },
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
