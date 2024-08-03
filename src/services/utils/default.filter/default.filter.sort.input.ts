import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum FilterSortByEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(FilterSortByEnum, {
  name: 'FilterSortByEnum',
});

@InputType()
export class DefaultFilterSortInput {
  @Field({ nullable: true, defaultValue: 'id' })
  field: string;

  @Field(() => FilterSortByEnum)
  by: FilterSortByEnum;

  @Field({ nullable: true, defaultValue: true })
  nullsFirst: boolean;
}
