import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { UsersModule } from './users/user.module';
import { databaseConfig } from './config/database.config';
import { mailerConfig } from './mails/config/mailer.config';
import { queueConfig } from './config/queue.config';
import { BullQueueModule } from './mails/bull-queue.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { CourseModule } from './courses/course.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { CartModule } from './cart/cart.module';
import { NotificationModule } from './notification/notification.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [
    databaseConfig,
    mailerConfig,
    queueConfig,
    JwtModule,
    BullQueueModule,
    UsersModule,
    FileUploadModule,
    CourseModule,
    RoadmapModule,
    CartModule,
    NotificationModule,
    ReviewModule,
    PaymentModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
