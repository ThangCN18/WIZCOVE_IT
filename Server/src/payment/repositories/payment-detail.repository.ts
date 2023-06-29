import { EntityRepository } from 'typeorm';
import { PaymentDetailEntity } from '../entities/payment-detail.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(PaymentDetailEntity)
export class PaymentDetailRepository extends BaseRepository<PaymentDetailEntity> {}
