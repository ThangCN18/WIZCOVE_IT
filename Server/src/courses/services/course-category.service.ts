import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository } from '../repositories/course-category.repository';
import { CreateCourseCategoryDto } from '../dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from '../dto/update-course-category.dto';

@Injectable()
export class CourseCategoryService {
  constructor(private courseCategoryRepo: CourseCategoryRepository) {}

  create(courseId: string, body: CreateCourseCategoryDto) {
    const data = { ...body, courseId };
    return this.courseCategoryRepo.save(data);
  }

  getCategories(courseId: string) {
    return this.courseCategoryRepo.findOneOrFail(
      { courseId },
      { relations: ['category', 'subCategory', 'courseTopic'] },
    );
  }

  update(courseId: string, body: UpdateCourseCategoryDto) {
    return this.courseCategoryRepo.update({ courseId }, body);
  }

  remove(courseId: string) {
    return this.courseCategoryRepo.delete({ courseId });
  }
}
