import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum FilterSortByEnum {
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

  @Field(() => FilterSortByEnum, {
    nullable: true,
    defaultValue: FilterSortByEnum.DESC,
  })
  by: FilterSortByEnum;

  @Field({ nullable: true, defaultValue: true })
  nullsFirst: boolean;
}
