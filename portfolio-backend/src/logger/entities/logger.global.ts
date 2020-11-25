import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsIP } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@InputType('GlobalLoggerType', { isAbstract: true })
@ObjectType()
@Entity()
export class GlobalLogger {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @Field(type => String)
  @IsIP()
  host: string;

  @Field(type => String)
  referer: string;

  @Field(type => String)
  method: string;

  @Field(type => String, { nullable: true })
  useragent?: string;

  @Field(type => String, { nullable: true })
  body?: string;
}