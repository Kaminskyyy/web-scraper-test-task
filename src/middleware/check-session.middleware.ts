import { NextFunction, Request, Response } from 'express';
import { InvalidCredentialsException } from '../errors/invalid-credentials.exception';
import { UnauthorizedException } from '../errors/unauthorized.exception';

export default function checkSession(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return next(new UnauthorizedException());
  next();
}
