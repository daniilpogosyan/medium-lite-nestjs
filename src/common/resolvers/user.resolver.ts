import { Args, Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { User } from '@prisma/client';
import { PostService } from 'src/post/post.service';
import { OffsetPaginationInput } from '../dto/pagination-offset.input';
// import { Dataloaders } from '../dataloaders/dataloader';

@Resolver(() => UserModel)
export class UserModelResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField('posts')
  async posts(
    @Parent() author: User,
    // @Context('dataLoaders') dataLoaders: Dataloaders,
    @Args('pagination', { type: () => OffsetPaginationInput, nullable: true })
    { page, limit }: OffsetPaginationInput,
  ) {
    console.count('user.posts resolver (NOLOADER)');
    const posts = await this.postService.getPosts({
      userId: author.id,
      limit,
      page,
    });
    return posts;
  }
}
