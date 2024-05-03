import { UserSignUpDto } from '../auth/dto/user-sign-up.dto';
import { HashService } from '../auth/hash.service';
import { User } from '../db/entity/user.entity';
import { AlreadyExistsException } from '../errors/already-exists.exception';

export class UsersService {
  static async findByEmail(email: string): Promise<User | null> {
    const where = { email };
    return User.findOne({ where });
  }

  static async findById(id: number): Promise<User | null> {
    const where = { id };
    return User.findOne({ where });
  }

  static async create(userDto: UserSignUpDto): Promise<User> {
    const existingUser = await this.findByEmail(userDto.email);
    if (existingUser) throw new AlreadyExistsException('user');

    const newUser = new User();
    Object.assign(newUser, userDto);

    newUser.password = await HashService.hashPassword(newUser.password);
    newUser.createdAt = new Date();

    await newUser.save();
    return newUser;
  }
}
