import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeanPosts } from './posts.interface';
import { GetPostsOptions } from './posts.dto';
import { READING_SPEED } from 'src/common/constants/posts.constants';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  private getReadingTimeEstimate(post: { content: string }) {
    return Math.round(post.content.length / READING_SPEED);
  }

  async getPosts(options: GetPostsOptions) {
    const limit = options.limit;
    const offset = options.limit * (options.page - 1);

    const posts = await this.prismaService.posts.findMany({
      skip: offset,
      take: limit,
      select: {
        title: true,
        content: options.includeContent ? true : false,
        ID: true,
        users: true,
      },
      where: {
        ...(options.userID !== undefined ? { authorID: options.userID } : {}),
      },
    });

    return posts;
  }

  async getPost(ID: number) {
    const post = await this.prismaService.posts.findUnique({
      select: {
        title: true,
        content: true,
        ID: true,
        users: true,
      },
      where: { ID },
    });

    if (post === null) {
      return null;
    }

    return {
      ...post,
      readingTimeEstimate: this.getReadingTimeEstimate(post),
    };
  }

  async createPost(leanPost: LeanPosts) {
    const { title, content, authorID } = leanPost;
    const post = await this.prismaService.posts.create({
      data: {
        title,
        content,
        authorID,
      },
    });

    return {
      ...post,
      readingTimeEstimate: this.getReadingTimeEstimate(post),
    };
  }
}
