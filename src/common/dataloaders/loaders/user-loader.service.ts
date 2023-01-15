import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as DataLoader from 'dataloader';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserLoaderService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  private async batchLoadFunction(ids: number[]) {
    const users = await this.prismaService.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const mappedObjs: { [key: number]: User } = {};
    users.forEach((obj) => (mappedObjs[obj.id] = obj));
    const orderedUsers = ids.map((id) => mappedObjs[id]);

    console.count('user batch fn');
    console.log(ids);
    return orderedUsers;
  }

  createUserLoader() {
    const dataLoader = new DataLoader<number, User>(
      this.batchLoadFunction.bind(this),
    );
    return dataLoader;
  }
}
