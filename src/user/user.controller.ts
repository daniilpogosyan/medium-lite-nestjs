import { Controller, Get, Query } from '@nestjs/common';
import { GetUsersOptions } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() options: GetUsersOptions) {
    return this.userService.getUsers(options);
  }
}
