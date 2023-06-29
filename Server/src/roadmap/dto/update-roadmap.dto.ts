import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoadmapDto } from './create-roadmap.dto';
import { CreateCourseRoadmapDto } from './create-course-roadmap.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoadmapDto extends PartialType(CreateRoadmapDto) {
  @ApiProperty({ type: [CreateCourseRoadmapDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseRoadmapDto)
  courses: CreateCourseRoadmapDto[];
}
