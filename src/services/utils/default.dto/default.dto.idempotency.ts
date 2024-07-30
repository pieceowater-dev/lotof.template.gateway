import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DefaultDtoIdempotency {
  @Field({ nullable: true })
  @IsUUID()
  idempotencyKey?: string;
}
