import { BaseEntity } from '../../core/entities/base.entity';
import { Column, ManyToOne, Entity, OneToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { LectureEntity } from '../../courses/entities/lecture.entity';
import { LectureResourceEntity } from '../../courses/entities/lecture-resource.entity';

@Entity('FileUpload')
export class FileUploadEntity extends BaseEntity {
  @Column()
  fileName: string;

  @Column({ unique: true })
  key: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.fileUploads)
  user: UserEntity;

  @OneToMany(
    () => LectureResourceEntity,
    (lectureResource) => lectureResource.fileUpload,
  )
  lectureResources: LectureResourceEntity[];
}
