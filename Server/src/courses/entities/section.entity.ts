import {
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Entity,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { CourseEntity } from './course.entity';
import { LectureEntity } from './lecture.entity';

@Entity('Section')
export class SectionEntity extends BaseEntity {
  @Column()
  @Index({ fulltext: true })
  name: string;

  @Column({ default: null })
  numSection: number;

  @Column()
  courseId: string;

  @ManyToOne(() => CourseEntity, (course) => course.sections)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @OneToMany(() => LectureEntity, (lecture) => lecture.section)
  lectures: LectureEntity[];
}
