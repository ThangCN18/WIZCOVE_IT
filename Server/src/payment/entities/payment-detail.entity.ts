import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity('PaymentDetail')
export class PaymentDetailEntity extends BaseEntity {
  @Column()
  paymentId: string;

  @Column()
  courseId: string;

  @ManyToOne(() => PaymentEntity)
  @JoinColumn({ name: 'paymentId' })
  payment: PaymentEntity;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;
}
