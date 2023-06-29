import { BaseEntity } from '../../core/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CourseEntity } from './course.entity';

@Entity('CourseSubscriber')
export class CourseSubscriberEntity extends BaseEntity {
  @Column()
  @Index()
  userId: string;

  @Column()
  @Index()
  courseId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;
}
