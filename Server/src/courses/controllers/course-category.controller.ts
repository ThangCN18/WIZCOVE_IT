import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CourseCategoryService } from '../services/course-category.service';
import { ApiTags } from '@nestjs/swagger';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { CreateCourseCategoryDto } from '../dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from '../dto/update-course-category.dto';

@Controller('courses/:courseId/categories')
@ApiTags('CourseCategory')
export class CourseCategoryController {
  constructor(private courseCategoryService: CourseCategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getCategories(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.courseCategoryService.getCategories(courseId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() body: CreateCourseCategoryDto,
  ) {
    return this.courseCategoryService.create(courseId, body);
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() body: UpdateCourseCategoryDto,
  ) {
    return this.courseCategoryService.update(courseId, body);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.courseCategoryService.remove(courseId);
  }
}
