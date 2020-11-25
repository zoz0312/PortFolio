import { Field, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, RelationId } from "typeorm";

export enum LogLevel {
  log = 'log',
  warning = 'warning',
  error = 'error',
};

registerEnumType(LogLevel, { name: 'LogLevel' });

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

  @Column()
  @Field(type => String)
  context: string;

  @Column()
  @Field(type => String)
  message: string;

  @Column({ nullable: true })
  @Field(type => Int)
  userId?: number;

  @Column({ type: 'enum', enum: LogLevel })
  @Field(type => LogLevel)
  @IsEnum(LogLevel)
  logLevel: LogLevel;
}