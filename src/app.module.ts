import { ConsoleLogger, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AccountModule } from './account/account.module';
import { ModelsResolversModule } from './common/resolvers/model-resolvers.module';
import { PrismaModule } from './prisma/prisma.modules';
import { DataLoaderModule } from './common/dataloaders/dataloader.module';
import { DataLoaderService } from './common/dataloaders/dataloader.service';

@Module({
  imports: [
    PrismaModule,
    ModelsResolversModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataLoaderModule],
      driver: ApolloDriver,
      useFactory: (dataLoaderService: DataLoaderService) => ({
        autoSchemaFile: true,
        context: () => {
          console.log('got loaders');
          return {
            dataLoaders: dataLoaderService.getLoaders(),
          };
        },
      }),
      inject: [DataLoaderService],
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
