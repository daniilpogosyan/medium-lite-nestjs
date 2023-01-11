import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostInput, GetPostsOptions } from './post.dto';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(@Query() options: GetPostsOptions) {
    return this.postService.getPosts(options);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPost(
    @Body() createPostInput: CreatePostInput,
    @Request() request: any,
  ) {
    const user = request.user as User;
    const authorId = user.id; 
    return this.postService.createPost({ ...createPostInput, authorId });
  }
}
