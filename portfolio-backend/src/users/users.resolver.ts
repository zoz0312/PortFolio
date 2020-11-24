import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { FindUserInput, FindUserOutput } from './dto/find-user.dto';
import { FindUsersOutput, FindUsersInput } from './dto/find-usres.dto';

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

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.usersService.remove(id);
  }
}
