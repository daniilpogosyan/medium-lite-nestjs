import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.modules';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
