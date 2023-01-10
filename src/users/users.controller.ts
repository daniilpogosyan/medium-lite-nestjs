import { Controller, Get, Query } from '@nestjs/common';
import { GetUsersOptions } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() options: GetUsersOptions) {
    process.exit(1);
    // return this.usersService.getUsers(options);
  }
}
