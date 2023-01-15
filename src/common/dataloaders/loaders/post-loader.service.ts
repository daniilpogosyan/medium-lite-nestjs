import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import * as DataLoader from 'dataloader';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostLoaderService {
  constructor(private prismaService: PrismaService) {}

  private async batchLoadFunction(ids: number[]) {
    const posts = await this.prismaService.post.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const mappedObjs: { [key: number]: Post } = {};
    posts.forEach((obj) => (mappedObjs[obj.id] = obj));
    const orderedPosts = ids.map((id) => mappedObjs[id]);

    console.count('post batch fn');
    console.log(ids);
    return orderedPosts;
  }

  createPostLoader() {
    const dataLoader = new DataLoader<number, Post>(
      this.batchLoadFunction.bind(this),
    );
    return dataLoader;
  }
}
