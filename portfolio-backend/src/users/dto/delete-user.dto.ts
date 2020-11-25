import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dto/core.output.dto";

@InputType()
export class DeleteUserIntput {
  @Field(type => Int)
  id: number;
}

@ObjectType()
export class DeleteUserOutput extends CoreOutput {}