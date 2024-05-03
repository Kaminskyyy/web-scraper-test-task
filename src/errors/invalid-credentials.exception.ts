import { BaseException } from './base.exception';

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super('Invalid credentials', 401);
  }
}
