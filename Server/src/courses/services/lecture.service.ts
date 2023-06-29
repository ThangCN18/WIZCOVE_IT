import { LectureRepository } from '../repositories/lecture.repository';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { UpdateLectureDto } from '../dto/update-lecture.dto';
import { SectionRepository } from '../repositories/section.repository';
import { CourseRepository } from '../repositories/course.repository';
import { isEmpty } from 'lodash';
import { LectureResourceRepository } from '../repositories/lecture-resource.repository';
import { Injectable } from '@nestjs/common';
import { CourseKeyMetricRepository } from '../repositories/course-key-metric.repository';

@Injectable()
export class LectureService {
  constructor(
    private lectureRepo: LectureRepository,
    private sectionRepo: SectionRepository,
    private courseRepo: CourseRepository,
    private lectureResourceRepo: LectureResourceRepository,
    private courseKeyMetricRepo: CourseKeyMetricRepository,
  ) {}

  getAll(sectionId: string) {
    return this.lectureRepo.find({
      where: { sectionId },
      order: { createdAt: 'ASC' },
    });
  }

  async create(userId: string, sectionId: string, body: CreateLectureDto) {
    const section = await this.sectionRepo.findOne({ id: sectionId });
    await this.courseRepo.findOneOrFail({ userId, id: section.courseId });
    const data = { ...body, sectionId };
    const lecture = await this.lectureRepo.save(data);
    if (!isEmpty(data.fileUploads)) {
      const resources = data.fileUploads.map(
        ({ fileUploadUrl, fileUploadId }) => ({
          fileUploadId,
          fileUploadUrl,
          lectureId: lecture.id,
        }),
      );
      await this.lectureResourceRepo.save(resources);
    }
    await this.courseKeyMetricRepo.update(
      { courseId: section.courseId },
      {
        totalLectures: () => '"totalLectures" + 1',
        totalDurations: () => `"totalDurations" + ${lecture.duration}`,
      },
    );

    return lecture;
  }

  getOne(sectionId: string, id: string) {
    return this.lectureRepo.findOneOrFail({ sectionId, id });
  }

  async update(
    userId: string,
    sectionId: string,
    id: string,
    body: UpdateLectureDto,
  ) {
    const section = await this.sectionRepo.findOne({ id: sectionId });
    await this.courseRepo.findOneOrFail({ userId, id: section.courseId });
    const lecture = await this.lectureRepo.update({ id, sectionId }, body);
    if (!isEmpty(body.fileUploads)) {
      const resources = body.fileUploads.map(
        ({ fileUploadUrl, fileUploadId }) => ({
          fileUploadId,
          fileUploadUrl,
          lectureId: id,
        }),
      );
      await this.lectureResourceRepo.save(resources);
    }
    return lecture;
  }

  async delete(userId: string, sectionId: string, id: string) {
    const section = await this.sectionRepo.findOne({ id: sectionId });
    await this.courseRepo.findOneOrFail({ userId, id: section.courseId });
    const lecture = await this.lectureRepo.softDelete({ sectionId, id });
    await this.courseKeyMetricRepo.update(
      { courseId: section.courseId },
      { totalLectures: () => '"totalLectures" - 1' },
    );
    return lecture;
  }

  getLectureOfSection(sectionId: string, lectureId: string) {
    return this.lectureRepo.findOneOrFail({
      where: { id: lectureId, sectionId },
      relations: ['section'],
    });
  }
}
