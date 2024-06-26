import { IsEmail, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 10)
  password: string;
}
