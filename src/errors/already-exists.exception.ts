import { BaseException } from './base.exception';

export class AlreadyExistsException extends BaseException {
  constructor(itemName: 'user') {
    const message = `${itemName} already exists`;
    super(message, 409);
  }
}
