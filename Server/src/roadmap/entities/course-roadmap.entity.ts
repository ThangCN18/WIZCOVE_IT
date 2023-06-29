import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CourseEntity } from '../../courses/entities/course.entity';
import { BaseEntity } from '../../core/entities/base.entity';
import { RoadmapEntity } from './roadmap.entity';

@Entity('CourseRoadmap')
export class CourseRoadmapEntity extends BaseEntity {
  @Column()
  @Index()
  courseId: string;

  @Column()
  @Index()
  roadmapId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @ManyToOne(() => RoadmapEntity)
  @JoinColumn({ name: 'roadmapId' })
  roadmap: RoadmapEntity;
}
