import { BaseException } from './base.exception.js';

export class NotFoundException extends BaseException {
  constructor(itemName: 'user') {
    const message = `${itemName} not found`;
    super(message, 404);
  }
}
