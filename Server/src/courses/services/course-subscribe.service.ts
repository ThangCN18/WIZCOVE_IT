import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseSubscribeRepository } from '../repositories/course-subscribe.repository';
import { CourseKeyMetricRepository } from '../repositories/course-key-metric.repository';
import { NotificationService } from '../../notification/services/notification.service';
import { ContentNotificationConstant } from '../../notification/constants/content-notification.constant';
import { CourseRepository } from '../repositories/course.repository';
import { orderBy } from 'lodash';
import { CourseEntity } from '../entities/course.entity';

@Injectable()
export class CourseSubscribeService {
  constructor(
    private courseSubscriberRepo: CourseSubscribeRepository,
    private courseKeyMetricRepo: CourseKeyMetricRepository,
    private notificationService: NotificationService,
    private courseRepo: CourseRepository,
  ) {}

  async createOne(userId: string, courseId: string) {
    const data = { userId, courseId };
    const courseSubData = await this.courseSubscriberRepo.findOne({
      courseId,
      userId,
    });
    if (courseSubData) {
      throw new BadRequestException('User subscribed course!');
    }
    const courseSub = await this.courseSubscriberRepo.save(data);
    const course = await this.courseRepo.findOne(
      { id: courseId },
      { relations: ['user'] },
    );
    const content = ContentNotificationConstant.SUBSCRIBE_COURSE.replace(
      '$$COURSE',
      course.name,
    ).replace(
      '$$INSTRUCTOR',
      `${course.user.firstName + ' ' + course.user.lastName}`,
    );
    await this.notificationService.create(userId, content);
    await this.courseKeyMetricRepo.update(
      { courseId },
      { currentSubscribers: () => '"currentSubscribers" + 1' },
    );
    return courseSub;
  }

  getCourseSub(courseId: string) {
    return this.courseSubscriberRepo.find({
      where: { courseId },
      relations: ['user', 'course', 'course.courseKeyMetric'],
    });
  }

  getCoursesOfUser(userId: string) {
    return this.courseSubscriberRepo.find({
      where: { userId },
      relations: [
        'course',
        'course.sections',
        'course.sections.lectures',
        'course.sections.lectures.resources',
        'course.courseKeyMetric',
      ],
    });
  }

  async getCourseOfUser(userId: string, courseId: string) {
    let courseSub = await this.courseSubscriberRepo.getCourseOfUser(
      userId,
      courseId,
    );
    const sections = courseSub.course.sections.map((section) => ({
      ...section,
      lectures: orderBy(
        section.lectures,
        ['numLecture', 'createdAt'],
        ['asc', 'asc'],
      ),
    }));
    courseSub.course = {
      ...courseSub.course,
      sections: orderBy(sections, ['numSection', 'createdAt'], ['asc', 'asc']),
    } as CourseEntity;

    return courseSub;
  }
}
