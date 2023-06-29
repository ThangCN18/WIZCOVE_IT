import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { LevelEnum } from '../enums/level.enum';
import { SectionEntity } from './section.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { CourseKeyMetricEntity } from './course-key-metric.entity';
import { CourseSubscriberEntity } from './course-subscriber.entity';
import { CourseRoadmapEntity } from '../../roadmap/entities/course-roadmap.entity';
import { CartEntity } from '../../cart/entities/cart.entity';
import { ReviewEntity } from '../../review/entities/review.entity';
import { PaymentDetailEntity } from '../../payment/entities/payment-detail.entity';
import { UserProgressEntity } from '../../users/entities/user-progress.entity';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseCategoryEntity } from './course-category.entity';

@Entity('Course')
export class CourseEntity extends BaseEntity {
  @Column()
  image: string;

  @Column({ unique: true })
  @Index({ fulltext: true })
  name: string;

  @Column()
  @Index({ fulltext: true })
  headline: string;

  @Column({ nullable: true })
  @Index({ fulltext: true })
  slug: string;

  @Column()
  price: number;

  @Column('text')
  @Index({ fulltext: true })
  description: string;

  @Column({ type: 'smallint' })
  level: LevelEnum;

  @Column({ enum: CourseTypeEnum, default: CourseTypeEnum.OFFLINE })
  type: CourseTypeEnum;

  @Column({ default: 0 })
  discount: number;

  @Column()
  language: string;

  @Column({ type: 'character varying', array: true })
  requirements: string[];

  @Column({ type: 'character varying', array: true })
  benefits: string[];

  @Column()
  @Index()
  userId: string;

  @OneToMany(() => SectionEntity, (section) => section.course)
  sections: SectionEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(() => CourseKeyMetricEntity, (keyMetric) => keyMetric.course)
  courseKeyMetric: CourseKeyMetricEntity;

  @OneToMany(() => CourseSubscriberEntity, (courseSub) => courseSub.course)
  users: CourseSubscriberEntity[];

  @OneToMany(() => CourseRoadmapEntity, (bundleCourse) => bundleCourse.course)
  courseRoadmaps: CourseRoadmapEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.course)
  carts: CartEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.course)
  reviews: ReviewEntity[];

  @OneToMany(() => PaymentDetailEntity, (paymentDetail) => paymentDetail.course)
  paymentDetails: PaymentDetailEntity[];

  @OneToMany(
    () => UserProgressEntity,
    (courseProgress) => courseProgress.course,
  )
  userProgress: UserProgressEntity[];

  @OneToOne(
    () => CourseCategoryEntity,
    (courseCategory) => courseCategory.course,
  )
  courseCategory: CourseCategoryEntity;
}
