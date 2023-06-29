import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsUUID } from 'class-validator';

export class LectureResourceDto {
  @ApiProperty()
  @IsUrl()
  fileUploadUrl: string;

  @ApiProperty()
  @IsUUID()
  fileUploadId: string;
}
