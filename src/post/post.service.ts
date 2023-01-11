import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeanPost } from './post.interface';
import { GetPostsOptions } from './post.dto';
import { READING_SPEED } from 'src/common/constants/post.constants';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  private getReadingTimeEstimate(post: { content: string }) {
    return Math.round(post.content.length / READING_SPEED);
  }

  async getPosts(options: GetPostsOptions) {
    const limit = options.limit;
    const offset = options.limit * (options.page - 1);

    const posts = await this.prismaService.post.findMany({
      skip: offset,
      take: limit,
      where: {
        ...(options.userId !== undefined ? { authorId: options.userId } : {}),
      },
    });

    return posts;
  }

  async getPost(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (post === null) {
      return null;
    }

    return {
      ...post,
      readingTimeEstimate: this.getReadingTimeEstimate(post),
    };
  }

  async createPost(leanPost: LeanPost) {
    const { title, content, authorId } = leanPost;
    const post = await this.prismaService.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return {
      ...post,
      readingTimeEstimate: this.getReadingTimeEstimate(post),
    };
  }
}
