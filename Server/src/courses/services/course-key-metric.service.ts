import { Injectable } from '@nestjs/common';
import { CourseKeyMetricRepository } from '../repositories/course-key-metric.repository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CourseKeyMetricEntity } from '../entities/course-key-metric.entity';

@Injectable()
export class CourseKeyMetricService {
  constructor(private courseKeyMetricRepo: CourseKeyMetricRepository) {}

  update(
    courseId: string,
    partialEntity: QueryDeepPartialEntity<CourseKeyMetricEntity>,
  ) {
    return this.courseKeyMetricRepo.update({ courseId }, partialEntity);
  }
}
