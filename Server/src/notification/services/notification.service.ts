import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class NotificationService {
  constructor(private notificationRepo: NotificationRepository) {}

  findAll(userId: string) {
    return this.notificationRepo.find({ userId });
  }

  async findOne(userId: string, id: string) {
    const notify = await this.notificationRepo.findOneOrFail({ id, userId });
    notify.isRead = true;
    return notify.save();
  }

  remove(userId: string, id: string) {
    return this.notificationRepo.delete({ id, userId });
  }

  create(userId: string, content: string) {
    return this.notificationRepo.save({ userId, content });
  }
}
