import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/core.output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class FindUserInput {
  @Field(type => Int)
  id: number;
}

@ObjectType()
export class FindUserOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User;
}