import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PostModel } from "../models/post.model";
import { Post } from '@prisma/client';
import { UserService } from "src/user/user.service";

@Resolver(() => PostModel)
export class PostModelResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField('author')
  async author(@Parent() post: Post) {
    const user = await this.userService.getUser(post.authorId);
    return user;
  }
}