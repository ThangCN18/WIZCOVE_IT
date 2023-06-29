import {
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Entity,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { FileUploadEntity } from '../../file-upload/entities/file-upload.entity';
import { LectureEntity } from './lecture.entity';

@Entity('LectureResource')
export class LectureResourceEntity extends BaseEntity {
  @Column()
  lectureId: string;

  @Column({ nullable: true })
  fileUploadId: string;

  @Column({ nullable: true })
  @Index()
  fileUploadUrl: string;

  @ManyToOne(
    () => FileUploadEntity,
    (fileUpload) => fileUpload.lectureResources,
  )
  @JoinColumn({ name: 'fileUploadId' })
  fileUpload: FileUploadEntity;

  @ManyToOne(() => LectureEntity)
  @JoinColumn({ name: 'lectureId' })
  lecture: LectureEntity;
}
