import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Review')
export class ReviewEntity extends BaseEntity {
  @Column()
  courseId: string;

  @Column()
  userId: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'float8' })
  rating: number;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
