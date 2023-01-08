import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  async getPosts() {
    return 'PostsService.getPosts() is not implemented yet'
  }

  async getPost() {
    return 'PostsService.getPost() is not implemented yet'
  }

  async createPost() {
    return 'PostsService.createPost() is not implemented yet'
  }
}