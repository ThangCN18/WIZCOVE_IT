import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseRepository } from '../repositories/course.repository';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { FindConditions, FindManyOptions, FindOneOptions } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { generateSlug } from '../../core/helpers/slug.helper';
import { CourseKeyMetricRepository } from '../repositories/course-key-metric.repository';
import { CourseCategoryRepository } from '../repositories/course-category.repository';
import { CategoryService } from '../../categories/services/category.service';
import { orderBy } from 'lodash';

@Injectable()
export class CourseService {
  constructor(
    private courseRepo: CourseRepository,
    private courseKeyMetricRepo: CourseKeyMetricRepository,
    private courseCategoryRepo: CourseCategoryRepository,
    private categoryService: CategoryService,
  ) {}

  async list(query: QueryParamsFilterDto) {
    const paginationCourse = await this.courseRepo.filter(query);
    let category;
    if (query.category) {
      category = await this.categoryService.getBySlug(query.category);
    }
    return { category, ...paginationCourse };
  }

  findAll(options?: FindManyOptions<CourseEntity>) {
    return this.courseRepo.find(options);
  }

  findOne(
    conditions?: FindConditions<CourseEntity>,
    options?: FindOneOptions<CourseEntity>,
  ) {
    return this.courseRepo.findOneOrFail(conditions, options);
  }

  getBySlug(slug: string) {
    return this.courseRepo.getBySlug(slug);
  }

  async getOne(id: string) {
    const course = await this.courseRepo.getOne(id);
    const sections = course.sections.map((section) => ({
      ...section,
      lectures: orderBy(
        section.lectures,
        ['numLecture', 'createdAt'],
        ['asc', 'asc'],
      ),
    }));
    return {
      ...course,
      sections: orderBy(sections, ['numSection', 'createdAt'], ['asc', 'asc']),
    };
  }

  async create(userId: string, body: CreateCourseDto) {
    const slug = generateSlug(body.name);
    const data = { ...body, userId, slug };
    const course = await this.courseRepo.save(data);
    await this.courseKeyMetricRepo.save({ courseId: course.id });
    if (body.categories) {
      await this.courseCategoryRepo.save({
        courseId: course.id,
        ...body.categories,
      });
    }
    return course;
  }

  update(id: string, body: UpdateCourseDto) {
    return this.courseRepo.update({ id }, body);
  }

  async delete(id: string) {
    await this.courseRepo.findOneOrFail(id);
    return this.courseRepo.softDelete({ id });
  }
}
