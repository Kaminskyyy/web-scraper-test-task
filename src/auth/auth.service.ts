import { User } from '../db/entity/user.entity';
import { UsersService } from '../users/users.service';
import { omit } from '../utils/omit.util';
import { UserloginResponseDto } from './dto/user-login-response.dto';
import { UserSignUpResponseDto } from './dto/user-sign-up-response.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { JwtService } from './jwt.service';

export class AuthService {
  static async signUp(userDto: UserSignUpDto): Promise<UserSignUpResponseDto> {
    const user = await UsersService.create(userDto);
    const jwt = JwtService.create(user.id);

    return {
      user: omit(user, 'password'),
      access_token: jwt
    };
  }

  static login(user: User): UserloginResponseDto {
    const jwt = JwtService.create(user.id);

    return {
      user: omit(user, 'password'),
      access_token: jwt
    };
  }
}
