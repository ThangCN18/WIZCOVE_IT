import { EntityRepository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { BaseRepository } from '../../core/repositories/base.repository';

@EntityRepository(CartEntity)
export class CartRepository extends BaseRepository<CartEntity> {}
