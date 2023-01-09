import { Injectable } from '@nestjs/common';
import { JwtPayload, SignOptions, sign } from 'jsonwebtoken';
import { hash, genSalt, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  issueJWT(payload: JwtPayload) {
    const options: SignOptions = {
      expiresIn: '3d',
      algorithm: 'HS256',
    };

    if (process.env.JWT_SECRET === undefined) return null;
    const token = sign(payload, process.env.JWT_SECRET, options);
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
