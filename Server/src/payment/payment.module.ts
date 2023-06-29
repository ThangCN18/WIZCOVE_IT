import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentDetailRepository } from './repositories/payment-detail.repository';

import { CourseModule } from '../courses/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository, PaymentDetailRepository]),
    CourseModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
