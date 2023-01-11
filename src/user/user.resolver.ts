import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserModel } from '../common/models/user.model';
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  async user(@Args('id', { type: () => Int}) id: number) {
    return this.userService.getUser(id)
  }

  @Query(() => [UserModel])
  async users(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ) {
    return this.userService.getUsers({limit, page})
  }
}