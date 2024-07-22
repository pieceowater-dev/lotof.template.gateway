import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum FilterPaginationLengthEnum {
  TWENTY_FIVE = 25,
  FIFTY = 50,
  HUNDRED = 100,
}

registerEnumType(FilterPaginationLengthEnum, {
  name: 'FilterPaginationLengthEnum',
});

@InputType()
export class DefaultFilterPaginationInput {
  @Field({ nullable: true, defaultValue: 0 })
  page: number;

  @Field(() => FilterPaginationLengthEnum)
  length: FilterPaginationLengthEnum;
}
