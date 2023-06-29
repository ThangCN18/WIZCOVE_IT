import { SectionRepository } from '../repositories/section.repository';
import { CreateSectionDto } from '../dto/create-section.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { CourseRepository } from '../repositories/course.repository';
import { Injectable } from '@nestjs/common';
import { CourseKeyMetricRepository } from '../repositories/course-key-metric.repository';

@Injectable()
export class SectionService {
  constructor(
    private sectionRepo: SectionRepository,
    private courseRepo: CourseRepository,
    private courseKeyMetricRepo: CourseKeyMetricRepository,
  ) {}

  getAll(courseId: string) {
    return this.sectionRepo.find({
      where: { courseId },
      order: { createdAt: 'ASC' },
    });
  }

  async create(userId: string, courseId: string, body: CreateSectionDto) {
    await this.courseRepo.findOneOrFail({ id: courseId, userId });
    const data = { ...body, courseId };
    const section = await this.sectionRepo.save(data);
    await this.courseKeyMetricRepo.update(
      { courseId },
      { totalSections: () => '"totalSections" + 1' },
    );
    return section;
  }

  getOne(courseId: string, id: string) {
    return this.sectionRepo.findOneOrFail({ id, courseId });
  }

  async update(
    userId: string,
    courseId: string,
    id: string,
    body: UpdateSectionDto,
  ) {
    await this.courseRepo.findOneOrFail({ id: courseId, userId });
    return this.sectionRepo.update({ id, courseId }, body);
  }

  async delete(userId: string, courseId: string, id: string) {
    await this.courseRepo.findOneOrFail({ id: courseId, userId });
    await this.sectionRepo.findOneOrFail({ courseId, id });
    const section = await this.sectionRepo.softDelete({ courseId, id });
    await this.courseKeyMetricRepo.update(
      { courseId },
      { totalSections: () => '"totalSections" - 1' },
    );
    return section;
  }
}
