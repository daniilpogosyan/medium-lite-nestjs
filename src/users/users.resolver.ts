import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserModel } from '../common/models/user.model';
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel)
  async user(@Args('id', { type: () => Int}) id: number) {
    return this.usersService.getUser(id)
  }

  @Query(() => [UserModel])
  async users(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ) {
    return this.usersService.getUsers({limit, page})
  }
}