import { InputType, Field } from '@nestjs/graphql';
import { DefaultDtoIdempotency } from '../../utils/default.dto/default.dto.idempotency';

@InputType()
export class CreateItemInput extends DefaultDtoIdempotency {
  @Field()
  name: string;

  @Field()
  comment: string;
}
