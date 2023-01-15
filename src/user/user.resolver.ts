import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Dataloaders } from 'src/common/dataloaders/dataloader';
import { OffsetPaginationInput } from 'src/common/dto/pagination-offset.input';
import { UserModel } from '../common/models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  async user(
    @Args('id', { type: () => Int }) id: number,
    @Context('dataLoaders') dataLoaders: Dataloaders,
  ) {
    console.count('user resolver');
    return dataLoaders.userDataLoader.load(id);
  }

  @Query(() => [UserModel])
  async users(
    @Args('pagination', { type: () => OffsetPaginationInput, nullable: true })
    { page, limit }: OffsetPaginationInput,
  ) {
    return this.userService.getUsers({ limit, page });
  }
}
