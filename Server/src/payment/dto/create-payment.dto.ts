import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNumber()
  cardNum: number;

  @ApiProperty()
  @IsString()
  cardName: string;

  @ApiProperty()
  @IsString()
  dialCode: string;

  @ApiProperty()
  @IsDateString()
  cardExpireAt: string;

  @ApiProperty()
  @IsNumber()
  cvcCard: number;

  @ApiProperty()
  @IsArray()
  @IsUUID('4', { each: true })
  courseIds: string[];
}
