import * as bcrypt from 'bcrypt';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  Gest = 'Gest',
  Company = 'Company',
  Admin = 'Admin',
};

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field(
    type => String,
    { description: 'User Email' },
  )
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(
    type => String,
    { description: 'User Password' },
  )
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(
    type => UserRole,
    { description: 'User Role' },
  )
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log('hashPassword Error', e)
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
