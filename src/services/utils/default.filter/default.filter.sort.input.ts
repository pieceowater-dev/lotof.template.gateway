import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { FilterSortByEnum } from '@pieceowater-dev/lotof.lib.broadcaster/utils/filter/sort.filter';

registerEnumType(FilterSortByEnum, {
  name: 'FilterSortByEnum',
});

@InputType()
export class DefaultFilterSortInput {
  @Field({ nullable: true, defaultValue: 'id' })
  field: string;

  @Field(() => FilterSortByEnum, {
    nullable: true,
    defaultValue: FilterSortByEnum.DESC,
  })
  by: FilterSortByEnum;

  @Field({ nullable: true, defaultValue: true })
  nullsFirst: boolean;
}
