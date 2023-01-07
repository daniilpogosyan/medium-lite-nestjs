import { Controller, Get, Post } from "@nestjs/common";


@Controller()
export class PostsController {
  @Get()
  getPosts() {
    return 'Not implemented yet';
  }

  @Get(':ID')
  getPost() {
    return 'Not implemented yet';
  }

  @Post()
  createPost() {
    return 'Not implemented yet';
  }
}