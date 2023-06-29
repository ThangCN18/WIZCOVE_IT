import { EntityRepository } from 'typeorm';
import { LectureEntity } from '../entities/lecture.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(LectureEntity)
export class LectureRepository extends BaseRepository<LectureEntity> {}
