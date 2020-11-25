import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType('GraphqlLoggerType', { isAbstract: true })
@ObjectType()
@Entity()
export class GraphqlLogger {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @Field(type => String)
  context: string;

  @Field(type => String)
  message: string;

  @Field(type => User, { nullable: true })
  user?: User;
}