import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from 'src/users/decorators/auth.decorator';
import { CurrentUser } from 'src/users/decorators/user-current.decorator';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseService } from '../services/course.service';
import { UserEntity } from '../../users/entities/user.entity';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpCode } from '@nestjs/common/decorators';
import { Roles } from 'src/users/decorators/roles.decorator';
import { RoleEnum } from 'src/users/enums/roles.enum';

@Controller('courses')
@ApiTags('Course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: UserEntity, @Body() body: CreateCourseDto) {
    return this.courseService.create(user.id, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: QueryParamsFilterDto) {
    return this.courseService.list(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.getOne(id);
  }

  @Get(':slug/details')
  @HttpCode(HttpStatus.OK)
  getBySlug(@Param('slug') slug: string) {
    return this.courseService.getBySlug(slug);
  }

  @Patch(':id')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCourseDto,
  ) {
    return this.courseService.update(id, body);
  }

  @Delete(':id')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.delete(id);
  }
}
