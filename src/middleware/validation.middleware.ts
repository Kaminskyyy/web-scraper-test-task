import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export default function validate<T>(target: 'body' | 'params', c: { new (): T }) {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    const instance = plainToInstance(c, req[target]);

    try {
      await validateOrReject(instance!);
    } catch (error) {
      console.log(typeof error);
      next(error);
    }

    req[target] = instance;
    next();
  };
}
