import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { PostModelResolver } from './post.resolver';
import { UserModelResolver } from './user.resolver';

@Module({
  imports: [UserModule, PostModule],
  providers: [PostModelResolver, UserModelResolver],
})
export class ModelsResolversModule {}
