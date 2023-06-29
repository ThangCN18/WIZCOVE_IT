import { Injectable } from '@nestjs/common';
import { CreateRoadmapDto } from '../dto/create-roadmap.dto';
import { UpdateRoadmapDto } from '../dto/update-roadmap.dto';
import { RoadmapRepository } from '../repositories/roadmap.repository';
import { isEmpty } from 'lodash';
import { CourseRoadmapRepository } from '../repositories/course-roadmap.repository';

@Injectable()
export class RoadmapService {
  constructor(
    private roadmapRepo: RoadmapRepository,
    private courseRoadmapRepo: CourseRoadmapRepository,
  ) {}

  async create(body: CreateRoadmapDto) {
    const roadmap = await this.roadmapRepo.save(body);
    if (!isEmpty(body.courses)) {
      const data = body.courses.map((course) => ({
        courseId: course.courseId,
        roadmapId: roadmap.id,
        description: course.description,
        title: course.title,
      }));
      await this.courseRoadmapRepo.save(data);
      const duration = await this.courseRoadmapRepo.geDuration(roadmap.id);
      await this.roadmapRepo.update({ id: roadmap.id }, { duration });
    }
    return roadmap;
  }

  findAll() {
    return this.roadmapRepo.find({
      relations: [
        'courseRoadmaps',
        'courseRoadmaps.course',
        'courseRoadmaps.course.courseKeyMetric',
        'courseRoadmaps.course.sections',
        'courseRoadmaps.course.sections.lectures',
      ],
    });
  }

  findOne(id: string) {
    return this.roadmapRepo.findOneOrFail(
      { id },
      {
        relations: [
          'courseRoadmaps',
          'courseRoadmaps.course',
          'courseRoadmaps.course.courseKeyMetric',
          'courseRoadmaps.course.sections',
          'courseRoadmaps.course.sections.lectures',
        ],
      },
    );
  }

  async update(id: string, body: UpdateRoadmapDto) {
    const { courses, ...data } = body;
    const roadmap = await this.roadmapRepo.update({ id }, data);
    if (!isEmpty(courses)) {
      await this.courseRoadmapRepo.delete({ roadmapId: id });
      const data = courses.map((course) => ({
        courseId: course.courseId,
        roadmapId: id,
        description: course.description,
        title: course.title,
      }));
      await this.courseRoadmapRepo.save(data);
      const duration = await this.courseRoadmapRepo.geDuration(id);
      await this.roadmapRepo.update({ id }, { duration });
    }
    return roadmap;
  }

  remove(id: string) {
    return this.roadmapRepo.softDelete({ id });
  }
}
