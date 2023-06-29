import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { LectureResourceDto } from './lecture-resource.dto';
import { Type } from 'class-transformer';

export class CreateLectureDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsString()
  videoUrl: string;

  @ApiProperty()
  @IsNumber()
  numLecture: number;

  @ApiProperty({ type: LectureResourceDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LectureResourceDto)
  fileUploads?: LectureResourceDto[];
}
