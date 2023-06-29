import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword, IsNotEmpty, IsJWT } from 'class-validator';
import { Match } from '../validators/match.validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5 })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5 })
  @Match('password')
  passwordConfirm: string;
}
