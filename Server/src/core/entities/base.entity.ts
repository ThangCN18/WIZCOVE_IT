import { TimestampTransformer } from 'src/core/transformers/timestamp.transformer';
import {
  BaseEntity as AbstractEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  updatedAt: number;

  @DeleteDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  deletedAt: number;
}
