import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { users } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostInput, GetPostsOptions } from './posts.dto';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  @Get()
  getPosts(@Query() options: GetPostsOptions) {
    return this.postsService.getPosts(options);
  }

  @Get(':ID')
  getPost(@Param('ID', ParseIntPipe) ID: number) {
    return this.postsService.getPost(ID);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Body() createPostInput: CreatePostInput) {
    const user = this.request.user as users;
    const authorID = user.ID; // hardcoded authorID since authorization is not implemented yer
    return this.postsService.createPost({ ...createPostInput, authorID });
  }
}
