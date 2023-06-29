import { BaseRepository } from '../../core/repositories/base.repository';
import { TokenEntity } from '../entities/token.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(TokenEntity)
export class TokenRepository extends BaseRepository<TokenEntity> {}
