import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './graphql/create-user.input';
import { UpdateUserInput } from './graphql/update-user.input';
import { UserGraphqlModel } from './graphql/user.entity';

@Resolver(() => UserGraphqlModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserGraphqlModel], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserGraphqlModel, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserGraphqlModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => UserGraphqlModel)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => UserGraphqlModel)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
