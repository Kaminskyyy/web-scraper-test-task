import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtPayload } from './interfaces/jwt-payload.interface';

export class JwtService {
  static create(userId: number): string {
    const payload: jwtPayload = { id: userId };
    const secret = process.env.JWT_SECRET!;
    const options: SignOptions = {
      expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options);
  }
}
