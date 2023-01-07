import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    AccountModule,
    UsersModule,
    PostsModule,
    RouterModule.register([
      {
        path: 'account',
        module: AccountModule,
      },
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'posts',
        module: PostsModule,
      }
    ])
  ]
})
export class AppModule {}
