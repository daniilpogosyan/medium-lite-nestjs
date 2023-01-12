import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OffsetPaginationInput } from 'src/common/dto/pagination-offset.input';
import { UserModel } from '../common/models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUser(id);
  }

  @Query(() => [UserModel])
  async users(
    @Args('pagination', { type: () => OffsetPaginationInput, nullable: true })
    { page, limit }: OffsetPaginationInput,
  ) {
    return this.userService.getUsers({ limit, page });
  }
}
