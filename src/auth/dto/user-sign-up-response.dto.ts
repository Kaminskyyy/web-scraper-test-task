import { User } from '../../db/entity/user.entity';

export interface UserSignUpResponseDto {
  user: Omit<User, 'password'>;
  access_token: string;
}
