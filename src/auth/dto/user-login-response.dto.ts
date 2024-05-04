import { User } from '../../db/entity/user.entity';

export interface UserloginResponseDto {
  user: Omit<User, 'password'>;
  access_token: string;
}
