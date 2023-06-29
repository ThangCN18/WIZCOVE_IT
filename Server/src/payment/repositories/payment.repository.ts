import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
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

@EntityRepository(PaymentEntity)
export class PaymentRepository extends BaseRepository<PaymentEntity> {
  async filter(params: QueryParamsFilterDto) {
    const query = this.createQueryBuilder('payment');
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
    this.order(orderParams, query);
    return this.paginate(paginateParams, query);
  }

  queries(query: SelectQueryBuilder<PaymentEntity>) {
    query
      .leftJoinAndSelect('payment.paymentDetails', 'paymentDetail')
      .leftJoinAndSelect('paymentDetail.course', 'course')
      .leftJoinAndSelect('payment.user', 'user');
  }

  order(sortParams?: SortParams, query?: SelectQueryBuilder<PaymentEntity>) {
    if (sortParams.sortField) {
      if (!sortParams.sortField.includes('.')) {
        sortParams.sortField = `course.${sortParams.sortField}`;
      }
      query.addOrderBy(sortParams.sortField, sortParams.sortDirection);
    }
  }

  async paginate(
    paginateParams: PaginationParams,
    query: SelectQueryBuilder<PaymentEntity>,
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

  search(keyword: string, query?: SelectQueryBuilder<PaymentEntity>) {
    if (!keyword) {
      return;
    }
    keyword = convertStringFullTextSearch(
      replaceSpecialCharactersIfExist(keyword),
    );
    query
      .where(searchFullText('payment.email', 'keyword'))
      .orWhere(searchFullText(`payment.status`, 'keyword'))
      .orWhere(searchFullText(`course.name`, 'keyword'))
      .setParameters({ keyword });
  }
}
