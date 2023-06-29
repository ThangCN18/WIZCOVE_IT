import { EntityRepository } from 'typeorm';
import { CourseKeyMetricEntity } from '../entities/course-key-metric.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(CourseKeyMetricEntity)
export class CourseKeyMetricRepository extends BaseRepository<CourseKeyMetricEntity> {}
