import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.input';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { FindUserInput, FindUserOutput } from './dto/find-user.dto';
import { FindUsersOutput, FindUsersInput } from './dto/find-usres.dto';
import { DeleteUserOutput, DeleteUserIntput } from './dto/delete-user.dto';
import { LoginOutput, LoginInput } from './dto/login-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(returns => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(returns => FindUsersOutput, { name: 'users' })
  async findAll(
    @Args('input') findUsersInput: FindUsersInput,
  ): Promise<FindUsersOutput> {
    return this.usersService.findAll(findUsersInput);
  }

  @Query(returns => FindUserOutput, { name: 'user' })
  async findOne(
    @Args('input') findUserInput: FindUserInput,
  ): Promise<FindUserOutput> {
    return this.usersService.findOne(findUserInput);
  }

  @Mutation(returns => UpdateUserOutput)
  async updateUser(
    @Args('input') updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(returns => DeleteUserOutput)
  async deleteUser(
    @Args('input') deleteUserIntput: DeleteUserIntput,
  ): Promise<DeleteUserOutput> {
    return this.usersService.delete(deleteUserIntput);
  }

  @Query(returns => LoginOutput)
  async login(
    @Args('input') loginInput: LoginInput,
  ): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }
}
