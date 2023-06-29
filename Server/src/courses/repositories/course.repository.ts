import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { BaseRepository } from '../../core/repositories/base.repository';
import { PaginationParams } from '../types/paginate-params.type';
import { SortParams } from '../types/sort-param.type';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import {
  convertStringFullTextSearch,
  searchFullText,
} from 'src/core/helpers/full-text-search.helper';
import { replaceSpecialCharactersIfExist } from 'src/core/helpers/string.helper';
import { PaginateParamConstant } from '../constants/paginate-params.constant';

@EntityRepository(CourseEntity)
export class CourseRepository extends BaseRepository<CourseEntity> {
  async filter(params: QueryParamsFilterDto) {
    const query = this.createQueryBuilder('course');
    const paginateParams = {
      perPage: params.perPage ?? PaginateParamConstant.perPage,
      page: params.page ?? PaginateParamConstant.page,
    };
    const orderParams = {
      sortField: params.sortField,
      sortDirection: params.sortDirection,
    };
    this.queries(query);
    this.search(params.keyword, query);
    this.filterCategory(params.category, query);
    this.order(orderParams, query);
    return this.paginate(paginateParams, query);
  }

  queries(query: SelectQueryBuilder<CourseEntity>) {
    query
      .leftJoinAndSelect('course.sections', 'section')
      .leftJoinAndSelect('section.lectures', 'lecture')
      .leftJoinAndSelect('course.courseKeyMetric', 'courseKeyMetric')
      .leftJoinAndSelect('course.courseCategory', 'courseCategory')
      .leftJoinAndSelect('courseCategory.category', 'category')
      .leftJoinAndSelect('courseCategory.subCategory', 'subCategory')
      .leftJoinAndSelect('courseCategory.courseTopic', 'courseTopic');
  }

  order(sortParams?: SortParams, query?: SelectQueryBuilder<CourseEntity>) {
    if (sortParams.sortField) {
      if (!sortParams.sortField.includes('.')) {
        sortParams.sortField = `course.${sortParams.sortField}`;
      }
      query.addOrderBy(sortParams.sortField, sortParams.sortDirection);
    } else {
      query.addOrderBy('course.createdAt', 'ASC');
    }
  }

  async paginate(
    paginateParams: PaginationParams,
    query: SelectQueryBuilder<CourseEntity>,
  ) {
    const [items, total] = await query
      .skip((paginateParams.page - 1) * paginateParams.perPage)
      .take(paginateParams.perPage)
      .getManyAndCount();

    return {
      total,
      lastPage: Math.ceil(total / paginateParams.perPage),
      perPage: paginateParams.perPage,
      currentPage: paginateParams.page,
      items,
    };
  }

  search(keyword: string, query?: SelectQueryBuilder<CourseEntity>) {
    if (!keyword) {
      return;
    }
    keyword = convertStringFullTextSearch(
      replaceSpecialCharactersIfExist(keyword),
    );
    query
      .where(searchFullText('course.name', 'keyword'))
      .orWhere(searchFullText(`course.headline`, 'keyword'))
      .setParameters({ keyword });
  }

  filterCategory(category: string, query: SelectQueryBuilder<CourseEntity>) {
    if (!category) {
      return;
    }
    query
      .orWhere('category.slug =:category')
      .orWhere('subCategory.slug =:category')
      .orWhere('courseTopic.slug =:category')
      .setParameters({ category });
  }

  getOne(id: string) {
    const query = this.createQueryBuilder('course');
    this.queries(query);
    return query
      .leftJoinAndSelect('lecture.resources', 'resources')
      .leftJoinAndSelect('resources.fileUpload', 'fileUpload')
      .where(`course.id = :id`, { id })
      .addOrderBy('section.createdAt', 'ASC')
      .addOrderBy('lecture.createdAt', 'ASC')
      .getOneOrFail();
  }

  getBySlug(slug: string) {
    const query = this.createQueryBuilder('course');
    this.queries(query);
    return query
      .where(`course.slug = :slug`, { slug })
      .addOrderBy('section.createdAt', 'ASC')
      .addOrderBy('lecture.createdAt', 'ASC')
      .getOneOrFail();
  }
}
