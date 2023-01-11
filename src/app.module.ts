import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
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
    UserModule,
    PostModule,
    RouterModule.register([
      {
        path: 'account',
        module: AccountModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
      {
        path: 'posts',
        module: PostModule,
      },
    ]),
  ],
})
export class AppModule {}
