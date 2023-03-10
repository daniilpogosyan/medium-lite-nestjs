import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersOptions } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getUsers(options: GetUsersOptions) {
    const limit = options.limit;
    const offset = options.limit * (options.page - 1);

    const users = await this.prismaService.users.findMany({
      skip: offset,
      take: limit,
      include: {
        posts: options.includePosts ? true : false,
      },
    });

    return users;
  }

  async getUser(ID: number) {
    const user = await this.prismaService.users.findUnique({
      where: { ID },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    return user;
  }

  async createUser(email: string, password: string) {
    const passwordHash = await this.authService.hashPassword(password);
    let user: users;
    user = await this.prismaService.users.create({
      data: {
        email,
        passwordHash,
      },
    });
    return user;
  }
}
