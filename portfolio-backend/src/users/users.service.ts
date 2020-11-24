import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { invalidError, permossionError } from 'src/common/error-text';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserRole } from './entities/user.entity';
import { errorUser } from './user-text';
import { FindUserInput, FindUserOutput } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}
  async createUser(
    { email, name, password, role }: CreateUserInput
  ): Promise<CreateUserOutput> {
    try {
      const user = await this.users.findOne(
        { email },
      );
      if (user) {
        return {
          ok: false,
          error: errorUser.alreadyEmail,
        }
      }

      if (role === UserRole.Admin) {
        return {
          ok: false,
          error: invalidError,
        }
      }

      await this.users.save(
        this.users.create({
          email,
          name,
          password,
          role,
        })
      );

      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: permossionError,
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(
    { id }: FindUserInput
  ): Promise<FindUserOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        ok: true,
        user,
      }
    } catch {
      return {
        ok: false,
        error: permossionError,
      }
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
