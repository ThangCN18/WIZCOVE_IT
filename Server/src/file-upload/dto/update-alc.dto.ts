import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateACLDto {
  @ApiProperty()
  @IsUUID()
  fileUploadId: string;
}
