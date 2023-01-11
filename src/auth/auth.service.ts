import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload, sign } from 'jsonwebtoken';
import { hash, genSalt, compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JWT_SIGN_OPTIONS } from '../common/constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  issueJWT(payload: JwtPayload) {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    if (JWT_SECRET === undefined)
      throw new HttpException(
        'Authentication is unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    const token = sign(payload, JWT_SECRET, JWT_SIGN_OPTIONS);
    return token;
  }

  async hashPassword(password: string) {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    return passwordHash;
  }

  async validate(password: string, passwordHash: string) {
    return compare(password, passwordHash);
  }
}
