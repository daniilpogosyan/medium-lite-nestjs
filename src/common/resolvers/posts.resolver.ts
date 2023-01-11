import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PostModel } from "../models/post.model";
import { Post } from '@prisma/client';
import { UsersService } from "src/users/users.service";

@Resolver(() => PostModel)
export class PostModelResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField('author')
  async author(@Parent() post: Post) {
    const user = await this.usersService.getUser(post.authorId);
    return user;
  }
}