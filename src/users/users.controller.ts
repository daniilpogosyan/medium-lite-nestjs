import { Controller, Get } from "@nestjs/common";


@Controller()
export class UserController {
  @Get()
  getUsers() {
    return 'Not implemented yet'
  }
}