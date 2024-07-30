import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DefaultDtoIdempotency } from '../../utils/default.dto/default.dto.idempotency';

@ObjectType()
export class Item extends DefaultDtoIdempotency {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  comment?: string;
}
