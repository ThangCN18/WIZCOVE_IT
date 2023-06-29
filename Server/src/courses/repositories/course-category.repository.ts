import { EntityRepository } from 'typeorm';
import { CourseCategoryEntity } from '../entities/course-category.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(CourseCategoryEntity)
export class CourseCategoryRepository extends BaseRepository<CourseCategoryEntity> {}
