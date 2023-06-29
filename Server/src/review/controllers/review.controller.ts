import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { CurrentUser } from '../../users/decorators/user-current.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Auth } from '../../users/decorators/auth.decorator';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../users/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/roles.enum';

@Controller()
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('courses/:courseId/review')
  @Auth()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: UserEntity,
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() body: CreateReviewDto,
  ) {
    return this.reviewService.create(user.id, courseId, body);
  }

  @Get('courses/:courseId/review')
  @HttpCode(HttpStatus.OK)
  getReviewsOfCourse(
    @Query() query: QueryParamsFilterDto,
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ) {
    return this.reviewService.getReviewsOfCourse(query, courseId);
  }

  @Patch('courses/:courseId/review')
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @CurrentUser() user: UserEntity,
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() body: UpdateReviewDto,
  ) {
    return this.reviewService.update(user.id, courseId, body);
  }

  @Get('review')
  findAll(@Query() query: QueryParamsFilterDto) {
    return this.reviewService.findAll(query);
  }

  @Get('review/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.findOne(id);
  }

  @Delete('review/:id')
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reviewService.remove(user, id);
  }
}
