import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const bearerToken = req.header('authorization');

    if (bearerToken === undefined) {
      // return false
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // assume that bearerToken is in the form:
    // 'Bearer {token}'
    const token = bearerToken.split(' ')[1];
    let decoded;

    if (process.env.JWT_SECRET === undefined) {
      // return false
      throw new HttpException(
        'Cannot verify jwt due to internal error. Secret is missing',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    try {
      decoded = verify(token, process.env.JWT_SECRET) as JwtPayload;
    } catch (err) {
      // return false
      throw new HttpException(
        err.message || 'JWT verification error',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userID: number = decoded.ID;
    const user = await this.usersService.getUser(userID);
    if (user === null) {
      // return false
      throw new HttpException(
        'User with this ID does not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }
    req.user = user;

    return true;
  }
}
