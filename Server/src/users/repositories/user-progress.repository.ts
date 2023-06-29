import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../core/repositories/base.repository';
import { UserProgressEntity } from '../entities/user-progress.entity';

@EntityRepository(UserProgressEntity)
export class UserProgressRepository extends BaseRepository<UserProgressEntity> {}
