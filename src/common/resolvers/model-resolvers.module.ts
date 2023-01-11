import { Module } from "@nestjs/common";
import { PostsModule } from "src/posts/posts.module";
import { UsersModule } from "src/users/users.module";
import { PostModelResolver } from "./posts.resolver";
import { UserModelResolver } from "./users.resolver";


@Module({
  imports: [UsersModule, PostsModule],
  providers: [PostModelResolver, UserModelResolver]
})
export class ModelsResolversModule {}