import { ParseRequest } from '../db/entity/parse-requests.entity';
import { User } from '../db/entity/user.entity';

export class ParseReqeustsService {
  static async addParseRequest(user: User): Promise<void> {
    const parseReqeust = new ParseRequest();
    parseReqeust.user = user;
    parseReqeust.createdAt = new Date();

    await parseReqeust.save();
  }

  // static async findAll() {

  // }
}
