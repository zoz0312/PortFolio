import { Injectable } from '@nestjs/common';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  async createUser(
    createUserInput: CreateUserInput
  ): Promise<CreateUserOutput> {
    try {

    } catch {
      return {
        ok: false,
        error: `허용할 수 없는 접근입니다.`,
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
