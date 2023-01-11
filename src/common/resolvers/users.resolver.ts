import { Args, Int, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { UserModel } from '../models/user.model';
import { User } from '@prisma/client';
import { PostsService } from "src/posts/posts.service";

@Resolver(() => UserModel)
export class UserModelResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField('posts')
  async posts(
    @Parent() author: User,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    const posts = await this.postsService.getPosts({userId: author.id, limit, page})
    return posts;
  }
}