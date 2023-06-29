import { EntityRepository } from 'typeorm';
import { RoadmapEntity } from '../entities/roadmap.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(RoadmapEntity)
export class RoadmapRepository extends BaseRepository<RoadmapEntity> {}
