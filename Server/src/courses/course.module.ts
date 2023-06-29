import { forwardRef, Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { SectionController } from './controllers/section.controller';
import { CourseService } from './services/course.service';
import { SectionService } from './services/section.service';
import { LectureController } from './controllers/lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './repositories/course.repository';
import { SectionRepository } from './repositories/section.repository';
import { LectureRepository } from './repositories/lecture.repository';
import { LectureService } from './services/lecture.service';
import { CourseKeyMetricRepository } from './repositories/course-key-metric.repository';
import { LectureResourceRepository } from './repositories/lecture-resource.repository';
import { CourseSubscribeRepository } from './repositories/course-subscribe.repository';
import { CourseSubscribeController } from './controllers/course-subscriber.controller';
import { CourseSubscribeService } from './services/course-subscribe.service';
import { NotificationModule } from '../notification/notification.module';
import { CourseKeyMetricService } from './services/course-key-metric.service';
import { UsersModule } from '../users/user.module';
import { CourseCategoryRepository } from './repositories/course-category.repository';
import { CourseCategoryController } from './controllers/course-category.controller';
import { CourseCategoryService } from './services/course-category.service';
import { CategoryModule } from '../categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseRepository,
      SectionRepository,
      LectureRepository,
      CourseKeyMetricRepository,
      LectureResourceRepository,
      CourseSubscribeRepository,
      CourseCategoryRepository,
    ]),
    NotificationModule,
    CategoryModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [
    CourseController,
    SectionController,
    LectureController,
    CourseSubscribeController,
    CourseCategoryController,
  ],
  providers: [
    CourseService,
    SectionService,
    LectureService,
    CourseSubscribeService,
    CourseKeyMetricService,
    CourseCategoryService,
  ],
  exports: [
    CourseService,
    SectionService,
    LectureService,
    CourseSubscribeService,
    CourseKeyMetricService,
    CourseCategoryService,
  ],
})
export class CourseModule {}
