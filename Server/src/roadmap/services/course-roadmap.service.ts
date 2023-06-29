import { Injectable } from '@nestjs/common';
import { CreateCourseRoadmapDto } from '../dto/create-course-roadmap.dto';
import { CourseRoadmapRepository } from '../repositories/course-roadmap.repository';
import { RoadmapRepository } from '../repositories/roadmap.repository';

@Injectable()
export class CourseRoadmapService {
  constructor(
    private courseRoadmapRepo: CourseRoadmapRepository,
    private roadmapRepo: RoadmapRepository,
  ) {}

  async create(roadmapId: string, body: CreateCourseRoadmapDto) {
    const data = { ...body, roadmapId };
    const bundleCourse = await this.courseRoadmapRepo.save(data);
    const duration = await this.courseRoadmapRepo.geDuration(roadmapId);
    await this.roadmapRepo.update({ id: roadmapId }, { duration });
    return bundleCourse;
  }

  getCoursesOfRoadmap(roadmapId: string) {
    return this.courseRoadmapRepo.find({
      where: { roadmapId },
      relations: [
        'course',
        'roadmap',
        'course.courseKeyMetric',
        'course.sections',
        'course.sections.lectures',
      ],
    });
  }

  async remove(roadmapId: string, courseId: string) {
    const bundleCourse = await this.courseRoadmapRepo.findOne(
      {
        roadmapId,
        courseId,
      },
      { relations: ['course', 'course.courseKeyMetric'] },
    );
    await this.roadmapRepo.update(
      { id: bundleCourse.roadmapId },
      {
        duration: () =>
          `duration - ${bundleCourse.course.courseKeyMetric.totalDurations}`,
      },
    );
    return bundleCourse.remove();
  }
}
