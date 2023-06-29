import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { BaseRepository } from '../../core/repositories/base.repository';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { PaginateParamConstant } from '../../courses/constants/paginate-params.constant';
import { SortParams } from '../../courses/types/sort-param.type';
import { PaginationParams } from '../../courses/types/paginate-params.type';
import {
  convertStringFullTextSearch,
  searchFullText,
} from '../../core/helpers/full-text-search.helper';
import { replaceSpecialCharactersIfExist } from '../../core/helpers/string.helper';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends BaseRepository<ReviewEntity> {
  async filter(params: QueryParamsFilterDto, courseId?: string) {
    const query = this.createQueryBuilder('Review').leftJoinAndSelect(
      'Review.user',
      'user',
    );
    if (courseId) {
      query.where('Review.courseId = :courseId', { courseId });
    }
    const paginateParams = {
      perPage: params.perPage ?? PaginateParamConstant.perPage,
      page: params.page ?? PaginateParamConstant.page,
    };
    const orderParams = {
      sortField: params.sortField,
      sortDirection: params.sortDirection,
    };
    this.search(params.keyword, query);
    this.order(orderParams, query);
    return this.paginate(paginateParams, query);
  }

  order(sortParams?: SortParams, query?: SelectQueryBuilder<ReviewEntity>) {
    if (sortParams.sortField) {
      if (!sortParams.sortField.includes('.')) {
        sortParams.sortField = `Review.${sortParams.sortField}`;
      }
      query.addOrderBy(sortParams.sortField, sortParams.sortDirection);
    }
  }

  async paginate(
    paginateParams: PaginationParams,
    query: SelectQueryBuilder<ReviewEntity>,
  ) {
    const items = await query
      .take(paginateParams.perPage)
      .skip((paginateParams.page - 1) * paginateParams.perPage)
      .getMany();
    return {
      total: items,
      lastPage: Math.ceil(items.length / paginateParams.perPage),
      perPage: paginateParams.perPage,
      currentPage: paginateParams.page,
      items,
    };
  }

  search(keyword: string, query?: SelectQueryBuilder<ReviewEntity>) {
    if (!keyword) {
      return;
    }
    keyword = convertStringFullTextSearch(
      replaceSpecialCharactersIfExist(keyword),
    );
    query
      .andWhere(searchFullText('Review.content', 'keyword'))
      .setParameters({ keyword });
  }
}
