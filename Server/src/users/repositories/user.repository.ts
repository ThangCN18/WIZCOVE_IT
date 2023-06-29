import { BaseRepository } from 'src/core/repositories/base.repository';
import { UserEntity } from '../entities/user.entity';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { PaginateParamConstant } from '../../courses/constants/paginate-params.constant';
import { SortParams } from '../../courses/types/sort-param.type';
import { PaginationParams } from '../../courses/types/paginate-params.type';
import {
  convertStringFullTextSearch,
  searchFullText,
} from '../../core/helpers/full-text-search.helper';
import { replaceSpecialCharactersIfExist } from '../../core/helpers/string.helper';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  async filter(params: QueryParamsFilterDto) {
    const query = this.createQueryBuilder('user');
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

  order(sortParams?: SortParams, query?: SelectQueryBuilder<UserEntity>) {
    if (sortParams.sortField) {
      if (!sortParams.sortField.includes('.')) {
        sortParams.sortField = `user.${sortParams.sortField}`;
      }
      query.addOrderBy(sortParams.sortField, sortParams.sortDirection);
    }
  }

  async paginate(
    paginateParams: PaginationParams,
    query: SelectQueryBuilder<UserEntity>,
  ) {
    const items = await query
      .take(paginateParams.perPage)
      .skip((paginateParams.page - 1) * paginateParams.perPage)
      .getMany();
    return {
      total: items.length,
      lastPage: Math.ceil(items.length / paginateParams.perPage),
      perPage: paginateParams.perPage,
      currentPage: paginateParams.page,
      items,
    };
  }

  search(keyword: string, query?: SelectQueryBuilder<UserEntity>) {
    if (!keyword) {
      return;
    }
    keyword = convertStringFullTextSearch(
      replaceSpecialCharactersIfExist(keyword),
    );
    query
      .where(searchFullText('user.firstName', 'keyword'))
      .orWhere(searchFullText(`user.lastName`, 'keyword'))
      .orWhere(searchFullText(`user.email`, 'keyword'))
      .orWhere(searchFullText(`user.bio`, 'keyword'))
      .setParameters({ keyword });
  }
}
