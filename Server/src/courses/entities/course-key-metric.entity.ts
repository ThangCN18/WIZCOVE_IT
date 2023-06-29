import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { CourseEntity } from './course.entity';

@Entity('CourseKeyMetric')
export class CourseKeyMetricEntity extends BaseEntity {
  @Column()
  courseId: string;

  @Column({ default: 0 })
  totalDurations: number;

  @Column({ default: 0 })
  currentSubscribers: number;

  @Column({ type: 'float8', default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalReviews: number;

  @Column({ default: 0 })
  totalResources: number;

  @Column({ default: 0 })
  totalSections: number;

  @Column({ default: 0 })
  totalLectures: number;

  @OneToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;
}
