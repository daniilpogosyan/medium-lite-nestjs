import { SignOptions } from 'jsonwebtoken';

export const JWT_SIGN_OPTIONS: SignOptions = {
  expiresIn: '3d',
  algorithm: 'HS256',
};
