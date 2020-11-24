import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/core.output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['email', 'name', 'password', 'role']
) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
