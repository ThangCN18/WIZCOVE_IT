import { BaseRepository } from '../../core/repositories/base.repository';
import { NotificationEntity } from '../entities/notification.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(NotificationEntity)
export class NotificationRepository extends BaseRepository<NotificationEntity> {}
