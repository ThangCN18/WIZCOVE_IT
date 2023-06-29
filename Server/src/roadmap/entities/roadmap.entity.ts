import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { CourseRoadmapEntity } from './course-roadmap.entity';

@Entity('Roadmap')
export class RoadmapEntity extends BaseEntity {
  @Column()
  @Index({ fulltext: true })
  name: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  duration: number;

  @Column({ type: 'character varying', array: true, nullable: true })
  requirements: string[];

  @Column({ type: 'character varying', array: true, nullable: true })
  benefits: string[];

  @OneToMany(() => CourseRoadmapEntity, (bundleCourse) => bundleCourse.roadmap)
  courseRoadmaps: CourseRoadmapEntity[];
}
