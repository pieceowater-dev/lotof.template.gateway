import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginatedEntity } from '@pieceowater-dev/lotof.lib.broadcaster/utils/pagination/entity.pagination';

export function PaginatedList<T>(classRef: Type<T>): Type<PaginatedEntity<T>> {
  @ObjectType(`${classRef.name}Info`)
  abstract class InfoType {
    @Field(() => Int)
    count: number;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements PaginatedEntity<T> {
    @Field(() => [classRef], { nullable: true })
    rows: T[];

    @Field(() => InfoType)
    info: InfoType;
  }
  return PaginatedType as Type<PaginatedEntity<T>>;
}
