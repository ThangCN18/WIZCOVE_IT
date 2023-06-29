import { EntityRepository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { BaseRepository } from '../../core/repositories/base.repository';
import { CategoryLevelEnum } from '../enums/category-level.enum';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import {
  convertStringFullTextSearch,
  searchFullText,
} from '../../core/helpers/full-text-search.helper';
import { replaceSpecialCharactersIfExist } from '../../core/helpers/string.helper';
import { SearchCategoryDto } from '../dto/search-category.dto';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {
  list() {
    return this.createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'subCategory')
      .leftJoinAndSelect('subCategory.children', 'courseTopic')
      .where('category.level = :level', { level: CategoryLevelEnum.CATEGORY })
      .getMany();
  }

  search(query: SearchCategoryDto) {
    const keyword = convertStringFullTextSearch(
      replaceSpecialCharactersIfExist(query.keyword),
    );
    return this.createQueryBuilder('category')
      .orderBy('category.level')
      .addOrderBy('category.name')
      .where(searchFullText('category.name', 'keyword'))
      .setParameters({ keyword })
      .limit(query.limit)
      .getMany();
  }
}
