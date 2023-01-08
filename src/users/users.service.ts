import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  async getUsers() {
    return 'UsersService.getUsers() is not implemented yet'
  }

  async getUser() {
    return 'UsersService.getUser() is not implemented yet'
  }

  async getUserByEmail() {
    return 'UsersService.getUserByEmail() is not implemented yet'
  }

  async createUser() {
    return 'UsersService.createUser() is not implemented yet'
  }

}