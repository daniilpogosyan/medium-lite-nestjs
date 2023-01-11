import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.modules';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
