import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CourseEntity } from './course.entity';

@Entity('CourseCategory')
export class CourseCategoryEntity extends BaseEntity {
  @Column()
  courseId: string;

  @Column()
  categoryId: string;

  @Column({ nullable: true })
  subCategoryId: string;

  @Column({ nullable: true })
  courseTopicId: string;

  @OneToOne(() => CourseEntity, (course) => course.courseCategory)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: CategoryEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'courseTopicId' })
  courseTopic: CategoryEntity;
}
