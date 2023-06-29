import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { SearchCategoryDto } from '../dto/search-category.dto';
import { CategoryLevelEnum } from '../enums/category-level.enum';
import { generateSlug } from '../../core/helpers/slug.helper';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async create(body: CreateCategoryDto) {
    const exist = await this.categoryRepo.findOne({ name: body.name });
    if (exist) {
      throw new BadRequestException('Category name already exists');
    }
    const slug = generateSlug(body.name);
    if (!body.parentId) {
      return this.categoryRepo.save({
        name: body.name,
        slug,
        level: CategoryLevelEnum.CATEGORY,
      });
    }

    const parent = await this.categoryRepo.findOne({ id: body.parentId });

    return this.categoryRepo.save({
      name: body.name,
      slug,
      level: ++parent.level,
      parentId: parent.id,
    });
  }

  findAll() {
    return this.categoryRepo.list();
  }

  search(query: SearchCategoryDto) {
    return this.categoryRepo.search(query);
  }

  getBySlug(slug: string) {
    return this.categoryRepo.findOne({ slug });
  }

  update(id: string, body: UpdateCategoryDto) {
    return this.categoryRepo.update({ id }, body);
  }

  remove(id: string) {
    return this.categoryRepo.delete({ id });
  }
}
