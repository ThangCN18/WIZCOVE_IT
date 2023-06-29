import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProgressRepository } from '../repositories/user-progress.repository';
import { CourseSubscribeService } from '../../courses/services/course-subscribe.service';
import { LectureService } from '../../courses/services/lecture.service';

@Injectable()
export class UserProgressService {
  constructor(
    private userProgressRepo: UserProgressRepository,
    private lectureService: LectureService,
    private courseSubscribeService: CourseSubscribeService,
  ) {}

  async completed(userId: string, sectionId: string, lectureId: string) {
    const lecture = await this.lectureService.getLectureOfSection(
      sectionId,
      lectureId,
    );

    const courseSub = await this.courseSubscribeService.getCourseOfUser(
      userId,
      lecture.section.courseId,
    );

    if (!courseSub) {
      throw new BadRequestException(
        'User does not have permission to rate the course!',
      );
    }
    const data = { userId, lectureId, courseId: lecture.section.courseId };
    const progress = await this.userProgressRepo.findOne({ where: data });
    if (progress) {
      return progress;
    }
    return this.userProgressRepo.save(data);
  }

  async getUserProgress(userId: string, sectionId: string, lectureId: string) {
    const lecture = await this.lectureService.getLectureOfSection(
      sectionId,
      lectureId,
    );
    const courseSub = await this.courseSubscribeService.getCourseOfUser(
      userId,
      lecture.section.courseId,
    );

    if (!courseSub) {
      throw new BadRequestException(
        'User does not have permission to rate the course!',
      );
    }

    const completed = await this.userProgressRepo.findOne({
      where: { userId, lectureId },
    });

    return { isCompleted: !!completed && completed.isCompleted };
  }
}
