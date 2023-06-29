import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseRoadmapService } from '../services/course-roadmap.service';
import { CreateCourseRoadmapDto } from '../dto/create-course-roadmap.dto';
import { Auth } from '../../users/decorators/auth.decorator';
import { Roles } from '../../users/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/roles.enum';

@Controller('roadmaps/:roadmapId/courses')
@ApiTags('CourseRoadmap')
export class CourseRoadmapController {
  constructor(private readonly courseRoadmapService: CourseRoadmapService) {}

  @Post()
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('roadmapId', ParseUUIDPipe) id: string,
    @Body() body: CreateCourseRoadmapDto,
  ) {
    return this.courseRoadmapService.create(id, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getCourseOfBundle(@Param('roadmapId', ParseUUIDPipe) id: string) {
    return this.courseRoadmapService.getCoursesOfRoadmap(id);
  }

  @Delete(':courseId')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('roadmapId', ParseUUIDPipe) bundleId: string,
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ) {
    return this.courseRoadmapService.remove(bundleId, courseId);
  }
}
