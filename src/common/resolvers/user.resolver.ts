import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { User } from '@prisma/client';
import { PostService } from 'src/post/post.service';
import { OffsetPaginationInput } from '../dto/pagination-offset.input';

@Resolver(() => UserModel)
export class UserModelResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField('posts')
  async posts(
    @Parent() author: User,
    @Args('pagination', { type: () => OffsetPaginationInput, nullable: true })
    { page, limit }: OffsetPaginationInput,
  ) {
    const posts = await this.postService.getPosts({
      userId: author.id,
      limit,
      page,
    });
    return posts;
  }
}
