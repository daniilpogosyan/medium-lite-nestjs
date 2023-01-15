import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostModel } from '../models/post.model';
import { Post } from '@prisma/client';
// import { UserService } from 'src/user/user.service';
import { Dataloaders } from '../dataloaders/dataloader';

@Resolver(() => PostModel)
export class PostModelResolver {
  // constructor(private readonly userService: UserService) {}

  @ResolveField('author')
  async author(
    @Parent() post: Post,
    @Context('dataLoaders') dataLoaders: Dataloaders,
  ) {
    console.count('post.author resolver');
    const user = await dataLoaders.userDataLoader.load(post.authorId);
    return user;
  }
}
