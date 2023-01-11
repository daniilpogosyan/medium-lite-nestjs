import { Args, Int, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { UserModel } from '../models/user.model';
import { User } from '@prisma/client';
import { PostService } from "src/post/post.service";

@Resolver(() => UserModel)
export class UserModelResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField('posts')
  async posts(
    @Parent() author: User,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    const posts = await this.postService.getPosts({userId: author.id, limit, page})
    return posts;
  }
}