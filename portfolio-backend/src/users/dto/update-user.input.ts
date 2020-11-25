import { InputType, Field, Int, PartialType, PickType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/core.output.dto';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(type => Number)
  id: number;
}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}
