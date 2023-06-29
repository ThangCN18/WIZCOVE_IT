import { EntityRepository } from 'typeorm';
import { SectionEntity } from '../entities/section.entity';
import { BaseRepository } from 'src/core/repositories/base.repository';

@EntityRepository(SectionEntity)
export class SectionRepository extends BaseRepository<SectionEntity> {}
