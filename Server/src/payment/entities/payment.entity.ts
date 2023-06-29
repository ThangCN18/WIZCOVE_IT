import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { PaymentStatus } from '../enums/payment-status';
import { PaymentDetailEntity } from './payment-detail.entity';

@Entity('Payment')
export class PaymentEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column({ nullable: true })
  @Index({ fulltext: true })
  email: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  totalPrice: number;

  @Column({ nullable: true })
  totalCourses: number;

  @Column({ nullable: true })
  cardExpireAt: number;

  @Column({ default: PaymentStatus.PENDING })
  @Index({ fulltext: true })
  status: PaymentStatus;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(
    () => PaymentDetailEntity,
    (paymentDetail) => paymentDetail.payment,
  )
  paymentDetails: PaymentDetailEntity[];
}
