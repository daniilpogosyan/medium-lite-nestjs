import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { DataLoaderService } from './dataloader.service';
import { PostLoaderService } from './loaders/post-loader.service';
import { UserLoaderService } from './loaders/user-loader.service';
@Module({
  imports: [UserModule, PostModule],
  providers: [DataLoaderService, UserLoaderService, PostLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
