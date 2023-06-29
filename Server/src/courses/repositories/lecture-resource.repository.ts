import { BaseRepository } from '../../core/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { LectureResourceEntity } from '../entities/lecture-resource.entity';

@EntityRepository(LectureResourceEntity)
export class LectureResourceRepository extends BaseRepository<LectureResourceEntity> {}
