import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostInput, GetPostsOptions } from './posts.dto';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query() options: GetPostsOptions) {
    return this.postsService.getPosts(options);
  }

  @Get(':ID')
  getPost(@Param('ID', ParseIntPipe) ID: number) {
    return this.postsService.getPost(ID);
  }

  @Post()
  createPost(@Body() createPostInput: CreatePostInput) {
    const authorID = 1; // hardcoded authorID since authorization is not implemented yer
    return this.postsService.createPost({ ...createPostInput, authorID });
  }
}
