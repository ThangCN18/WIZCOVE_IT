import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/core/entities/base.entity';

import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RoleEnum } from '../enums/roles.enum';
import { TokenEntity } from './token.entity';
import { FileUploadEntity } from '../../file-upload/entities/file-upload.entity';
import { CourseSubscriberEntity } from '../../courses/entities/course-subscriber.entity';
import { NotificationEntity } from '../../notification/entities/notification.entity';
import { ReviewEntity } from '../../review/entities/review.entity';
import { PaymentEntity } from '../../payment/entities/payment.entity';
import { UserProgressEntity } from './user-progress.entity';
import { env } from '../../config/env.config';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  bio: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: RoleEnum.USER })
  role: RoleEnum;

  @Column({ nullable: true, default: env.AVATAR_DEFAULT })
  avatar: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];

  @OneToMany(() => FileUploadEntity, (fileUpload) => fileUpload.user)
  fileUploads: FileUploadEntity[];

  @OneToMany(() => CourseSubscriberEntity, (courseSub) => courseSub.user)
  courses: CourseSubscriberEntity[];

  @OneToMany(() => NotificationEntity, (notify) => notify.user)
  notifications: NotificationEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  review: ReviewEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.user)
  payment: PaymentEntity;

  @OneToMany(() => UserProgressEntity, (useProgress) => useProgress.user)
  userProgress: UserProgressEntity[];
}
