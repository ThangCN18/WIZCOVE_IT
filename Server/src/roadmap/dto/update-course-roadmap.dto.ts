import { PartialType } from '@nestjs/swagger';
import { CreateCourseRoadmapDto } from './create-course-roadmap.dto';

export class UpdateCourseRoadmapDto extends PartialType(
  CreateCourseRoadmapDto,
) {}
