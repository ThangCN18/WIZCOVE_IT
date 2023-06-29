import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword, IsNotEmpty } from 'class-validator';
import { Match } from '../validators/match.validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5 })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5 })
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5 })
  @Match('newPassword')
  passwordConfirm: string;
}
