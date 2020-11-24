import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/core.output.dto";
import { User, UserRole } from "../entities/user.entity";
import { PagenationInput, PagenationOutput } from '../../common/dto/pagement.dto';
import { Length } from "class-validator";

@InputType()
export class FindUsersInput extends PagenationInput {
  @Field(type => String, { nullable: true })
  email?: string;

  @Field(role => UserRole, { nullable: true })
  role?: UserRole;
}

@ObjectType()
export class FindUsersOutput extends PagenationOutput {
  @Field(type => [User], { nullable: true })
  users?: User[];
}