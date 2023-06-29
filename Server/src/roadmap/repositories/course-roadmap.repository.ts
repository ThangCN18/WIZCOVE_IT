import { EntityRepository } from 'typeorm';
import { CourseRoadmapEntity } from '../entities/course-roadmap.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(CourseRoadmapEntity)
export class CourseRoadmapRepository extends BaseRepository<CourseRoadmapEntity> {
  async geDuration(roadmapId: string) {
    const total = await this.createQueryBuilder('CourseRoadmap')
      .leftJoinAndSelect('CourseRoadmap.course', 'Course')
      .leftJoinAndSelect('Course.courseKeyMetric', 'CourseKeyMetric')
      .select('Sum("CourseKeyMetric"."totalDurations")::int')
      .where('CourseRoadmap.roadmapId = :roadmapId', { roadmapId })
      .groupBy('CourseRoadmap.roadmapId')
      .getRawOne();
    return total.sum;
  }
}
