import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity('Category')
export class CategoryEntity extends BaseEntity {
  @Column({ unique: true })
  @Index({ fulltext: true })
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @Column({ type: 'smallint' })
  level: number;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children)
  @JoinColumn({ name: 'parentId' })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];
}
