import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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

    const users = await this.prismaService.user.findMany({
      skip: offset,
      take: limit,
    });

    return users;
  }

  async getUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }

  async createUser(email: string, password: string) {
    const passwordHash = await this.authService.hashPassword(password);
    let user: User;
    user = await this.prismaService.user.create({
      data: {
        email,
        passwordHash,
      },
    });
    return user;
  }
}
