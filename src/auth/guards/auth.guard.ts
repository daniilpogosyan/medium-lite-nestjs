import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {}
  
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const bearerToken = req.header('authorization');

    if (bearerToken === undefined) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // assume that bearerToken is in the form:
    // 'Bearer {token}'
    const token = bearerToken.split(' ')[1];

    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    if (JWT_SECRET === undefined) {
      throw new HttpException(
        'Authentication is unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      
    let decoded: JwtPayload;
    try {
      decoded = verify(token, JWT_SECRET) as JwtPayload;
    } catch (err) {
      throw new HttpException(
        err.message || 'JWT verification error',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userID: number = decoded.ID;
    const user = await this.usersService.getUser(userID);
    if (user === null) {
      throw new HttpException(
        'User with this ID does not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }
    req.user = user;

    return true;
  }
}
