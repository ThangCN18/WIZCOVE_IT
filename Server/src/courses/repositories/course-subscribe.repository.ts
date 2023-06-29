import { EntityRepository } from 'typeorm';
import { CourseSubscriberEntity } from '../entities/course-subscriber.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(CourseSubscriberEntity)
export class CourseSubscribeRepository extends BaseRepository<CourseSubscriberEntity> {
  getCourseOfUser(userId: string, courseId: string) {
    return this.createQueryBuilder('CourseSubscribe')
      .leftJoinAndSelect('CourseSubscribe.course', 'Course')
      .leftJoinAndSelect('Course.sections', 'Section')
      .leftJoinAndSelect('Section.lectures', 'Lecture')
      .leftJoinAndSelect('Lecture.resources', 'Resource')
      .leftJoinAndSelect('Resource.fileUpload', 'fileUpload')
      .leftJoinAndSelect('Course.courseKeyMetric', 'courseKeyMetric')
      .leftJoin(
        'Course.userProgress',
        'UserProgress',
        'UserProgress.userId = :userId',
        { userId },
      )
      .addSelect('UserProgress.lectureId')
      .where('CourseSubscribe.courseId = :courseId', { courseId })
      .addOrderBy('Section.createdAt', 'ASC')
      .addOrderBy('Lecture.createdAt', 'ASC')
      .getOneOrFail();
  }
}
