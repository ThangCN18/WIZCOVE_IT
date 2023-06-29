import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { CourseEntity } from '../../courses/entities/course.entity';

@Entity('Cart')
export class CartEntity extends BaseEntity {
  @Column()
  @Index()
  userId: string;

  @Column()
  @Index()
  courseId: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;
}
