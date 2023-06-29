import { Column, JoinColumn, ManyToOne, OneToMany, Entity } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { LectureResourceEntity } from './lecture-resource.entity';
import { SectionEntity } from './section.entity';
import { UserProgressEntity } from '../../users/entities/user-progress.entity';

@Entity('Lecture')
export class LectureEntity extends BaseEntity {
  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  duration: number;

  @Column()
  videoUrl: string;

  @Column({ nullable: true })
  numLecture: number;

  @Column()
  sectionId: string;

  @ManyToOne(() => SectionEntity, (section) => section.lectures)
  @JoinColumn({ name: 'sectionId' })
  section: SectionEntity;

  @OneToMany(
    () => LectureResourceEntity,
    (lectureResource) => lectureResource.lecture,
  )
  resources: LectureResourceEntity[];

  @OneToMany(() => UserProgressEntity, (userProgress) => userProgress.lecture)
  userProgress: UserProgressEntity[];
}
