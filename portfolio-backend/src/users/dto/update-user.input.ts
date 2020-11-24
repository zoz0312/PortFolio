import { InputType, Field, Int, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field(type => Number)
  id: number;
}
