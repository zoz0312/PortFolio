import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsIP } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


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

  @Column()
  @Field(type => String)
  @IsIP()
  host: string;

  @Column()
  @Field(type => String)
  referer: string;

  @Column()
  @Field(type => String)
  method: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  useragent?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  body?: string;
}