import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListUserFilterInput } from './dto/list-user.filter.input';
import { User } from './entities/user.entity';
import { PaginatedEntity } from '../utils/paginated.list/paginated.entity';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput): User {
    return { id: 1, ...createUserInput };
  }

  findAll(listUserFilterInput: ListUserFilterInput): PaginatedEntity<User> {
    console.log('UsersService findAll filter:', listUserFilterInput);
    return {
      rows: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Adam Smith' },
        { id: 3, name: 'Eva Bruh' },
      ],
      info: {
        count: 10,
      },
    };
  }

  findOne(id: number): User {
    return { id: id, name: 'John Doll' };
  }

  update(id: number, updateUserInput: UpdateUserInput): User {
    return { id: id, name: updateUserInput.name ?? 'John Doll' };
  }
}
