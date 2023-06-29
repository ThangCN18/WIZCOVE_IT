import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class CheckoutInfoDto {
  @ApiProperty()
  @IsArray()
  @IsUUID('4', { each: true })
  courseIds: string[];
}
