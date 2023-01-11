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
import { CreatePostInput, GetPostsOptions } from './posts.dto';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query() options: GetPostsOptions) {
    return this.postsService.getPosts(options);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPost(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPost(
    @Body() createPostInput: CreatePostInput,
    @Request() request: any,
  ) {
    const user = request.user as User;
    const authorId = user.id; 
    return this.postsService.createPost({ ...createPostInput, authorId });
  }
}
