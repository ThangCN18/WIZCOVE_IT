import { BaseEntity } from 'src/core/entities/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TimestampTransformer } from '../../core/transformers/timestamp.transformer';

@Entity('Token')
export class TokenEntity extends BaseEntity {
  @Index()
  @Column()
  userId: string;

  @Column({ unique: true })
  token: string;

  @Column('timestamp', { transformer: new TimestampTransformer() })
  expireAt: number | Date;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
