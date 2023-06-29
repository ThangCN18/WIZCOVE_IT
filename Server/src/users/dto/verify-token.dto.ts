import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsJWT } from 'class-validator';

export class VerifyTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
