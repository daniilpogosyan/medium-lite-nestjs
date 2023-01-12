import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OffsetPaginationInput } from 'src/common/dto/pagination-offset.input';
import { PostService } from 'src/post/post.service';
import { PostModel } from '../common/models/post.model';
import { PostInput } from './post.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => PostModel)
  async post(@Args('id', { type: () => Int }) id: number) {
    return this.postService.getPost(id);
  }

  @Query(() => [PostModel])
  async posts(
    @Args('pagination', { type: () => OffsetPaginationInput, nullable: true })
    { page, limit }: OffsetPaginationInput,
  ) {
    return this.postService.getPosts({ page, limit });
  }

  @Mutation(() => PostModel)
  @UseGuards(AuthGuard)
  async createPost(
    @Args('postInput', { type: () => PostInput }) postInput: PostInput,
    @Context('req') req: { user: User },
  ) {
    const newPost = await this.postService.createPost({
      ...postInput,
      authorId: req.user.id,
    });
    return newPost;
  }
}
