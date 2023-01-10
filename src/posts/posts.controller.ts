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
import { users } from '@prisma/client';
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

  @Get(':ID')
  getPost(@Param('ID', ParseIntPipe) ID: number) {
    return this.postsService.getPost(ID);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Body() createPostInput: CreatePostInput , @Request() request: any) {
    const user = request.user as users;
    const authorID = user.ID; // hardcoded authorID since authorization is not implemented yer
    return this.postsService.createPost({ ...createPostInput, authorID });
  }
}
