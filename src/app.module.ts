import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AccountModule } from './account/account.module';
import { ModelsResolversModule } from './common/resolvers/model-resolvers.module';

@Module({
  imports: [
    ModelsResolversModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
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
      },
    ]),
  ],
})
export class AppModule {}
