import { Controller, Get, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";


@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':ID')
  getPost() {
    return this.postsService.getPost();
  }

  @Post()
  createPost() {
    return this.postsService.createPost();
  }
}