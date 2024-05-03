import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../errors/base.exception.js';

export default function (error: unknown, req: Request, res: Response, next: NextFunction) {
  if (error instanceof Array && error.length > 0 && error[0] instanceof ValidationError) {
    const message = extractValidationErrorMessage(error);
    return res.status(400).json({ validationErrors: message });
  }

  if (error instanceof BaseException) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error);
  res.status(500).send({
    error: 'Something went wrong'
  });
}

function extractValidationErrorMessage(errors: ValidationError[]): string[] {
  const message: string[] = [];

  for (const validationError of errors) {
    for (const constraint in validationError.constraints) {
      message.push(validationError.constraints[constraint]);
    }
  }

  return message;
}
