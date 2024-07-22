import { Field, InputType } from '@nestjs/graphql';
import { DefaultFilterPaginationInput } from './default.filter.pagination.input';
import { DefaultFilterSortInput } from './default.filter.sort.input';

@InputType()
export class DefaultFilterInput {
  @Field({ nullable: true })
  search: string;

  @Field(() => DefaultFilterPaginationInput)
  pagination: DefaultFilterPaginationInput;

  @Field(() => DefaultFilterSortInput)
  sort: DefaultFilterSortInput;
}
