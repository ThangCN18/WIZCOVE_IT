import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { LevelEnum } from '../enums/level.enum';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CreateCourseCategoryDto } from './create-course-category.dto';
import { Transform, Type } from 'class-transformer';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  headline: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(LevelEnum)
  level: LevelEnum;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CourseTypeEnum)
  type: CourseTypeEnum;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty()
  @IsString()
  language?: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCourseCategoryDto)
  categories?: CreateCourseCategoryDto;
}
