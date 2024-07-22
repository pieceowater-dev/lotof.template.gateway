import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListUserFilterInput } from './dto/list-user.filter.input';
import { PaginatedUserList } from './entities/paginated.user.list.entity';
import { PaginatedEntity } from '../utils/paginated.list/paginated.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Query(() => PaginatedUserList, { name: 'users' })
  findAll(
    @Args('filter') listUserFilterInput: ListUserFilterInput,
  ): PaginatedEntity<User> {
    return this.usersService.findAll(listUserFilterInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }
}
