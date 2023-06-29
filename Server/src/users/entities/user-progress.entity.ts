import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { LectureEntity } from '../../courses/entities/lecture.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from '../../core/entities/base.entity';
import { CourseEntity } from '../../courses/entities/course.entity';

@Entity('UserProgress')
export class UserProgressEntity extends BaseEntity {
  @Column()
  @Index()
  courseId: string;

  @Column()
  @Index()
  lectureId: string;

  @Column()
  @Index()
  userId: string;

  @Column({ default: true })
  isCompleted: boolean;

  @ManyToOne(() => LectureEntity)
  @JoinColumn({ name: 'lectureId' })
  lecture: LectureEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;
}
