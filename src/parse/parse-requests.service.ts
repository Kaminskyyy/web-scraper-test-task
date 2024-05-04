import { FindManyOptions } from 'typeorm';
import { ParseRequest } from '../db/entity/parse-requests.entity';
import { User } from '../db/entity/user.entity';
import { DEFAULT_PAGE_SIZE } from './constants';

export class ParseReqeustsService {
  static async addParseRequest(user: User): Promise<void> {
    const parseReqeust = new ParseRequest();
    parseReqeust.user = user;
    parseReqeust.createdAt = new Date();

    await parseReqeust.save();
  }

  static async findAll(pageNumber: number | undefined = undefined, pageSize: number | undefined = undefined) {
    const options: FindManyOptions<ParseRequest> = {};

    options.select = {
      user: {
        email: true,
        firstName: true,
        lastName: true
      }
    };

    options.relations = {
      user: true
    };

    if (pageNumber !== undefined && pageSize !== undefined) {
      options.skip = pageNumber! * pageSize!;
      options.take = pageSize;
    }

    if (pageNumber !== undefined && pageSize === undefined) {
      options.skip = pageNumber! * DEFAULT_PAGE_SIZE;
      options.take = DEFAULT_PAGE_SIZE;
    }

    return ParseRequest.find(options);
  }
}
