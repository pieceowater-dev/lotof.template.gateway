import { InputType } from '@nestjs/graphql';
import { DefaultFilterInput } from '../../utils/default.filter/default.filter.input';

@InputType()
export class ListItemFilterInput extends DefaultFilterInput {}
