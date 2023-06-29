import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseSubscribeService } from '../services/course-subscribe.service';
import { CurrentUser } from '../../users/decorators/user-current.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { Auth } from '../../users/decorators/auth.decorator';

@Controller('courses/:courseId/subscribe')
@ApiTags('CourseSubscribe')
export class CourseSubscribeController {
  constructor(private courseSubscribeService: CourseSubscribeService) {}

  @Post()
  @Auth()
  @HttpCode(HttpStatus.CREATED)
  sub(
    @CurrentUser() user: UserEntity,
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ) {
    return this.courseSubscribeService.createOne(user.id, courseId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getSubscribe(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.courseSubscribeService.getCourseSub(courseId);
  }

  @Get('/user')
  @Auth()
  @HttpCode(HttpStatus.OK)
  getCourseOfUser(
    @CurrentUser() user: UserEntity,
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ) {
    return this.courseSubscribeService.getCourseOfUser(user.id, courseId);
  }
}
