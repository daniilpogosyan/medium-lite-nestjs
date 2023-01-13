import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PostController } from './post.controller';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [AuthModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
