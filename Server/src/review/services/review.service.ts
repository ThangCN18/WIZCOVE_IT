import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewRepository } from '../repositories/review.repository';
import { CourseSubscribeService } from '../../courses/services/course-subscribe.service';
import { CourseKeyMetricService } from '../../courses/services/course-key-metric.service';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/enums/roles.enum';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepo: ReviewRepository,
    private courseSubscribeService: CourseSubscribeService,
    private courseKeyMetricService: CourseKeyMetricService,
  ) {}

  async create(userId, courseId: string, body: CreateReviewDto) {
    const course = await this.courseSubscribeService.getCourseOfUser(
      userId,
      courseId,
    );
    if (!course) {
      throw new BadRequestException(
        'User does not have permission to rate the course!',
      );
    }
    const rated = await this.reviewRepo.findOne({ userId: userId, courseId });
    if (rated) {
      throw new BadRequestException('User have rated the course!');
    }
    const data = { ...body, userId: userId, courseId };
    const review = await this.reviewRepo.save(data);
    await this.courseKeyMetricService.update(courseId, {
      totalReviews: () => '"totalReviews" + 1',
    });
    await this.calInsertRating(courseId, body.rating);
    return review;
  }

  findAll(query: QueryParamsFilterDto) {
    return this.reviewRepo.filter(query);
  }

  getReviewsOfCourse(query: QueryParamsFilterDto, courseId: string) {
    return this.reviewRepo.filter(query, courseId);
  }

  findOne(id: string) {
    return this.reviewRepo.findOne({ id }, { relations: ['user'] });
  }

  async update(userId: string, courseId: string, body: UpdateReviewDto) {
    const course = await this.courseSubscribeService.getCourseOfUser(
      userId,
      courseId,
    );
    if (!course) {
      throw new BadRequestException(
        'User does not have permission to rate the course!',
      );
    }
    const review = await this.reviewRepo.update({ userId, courseId }, body);
    await this.calUpdateRating(courseId);
    return review;
  }

  async remove(user: UserEntity, id: string) {
    const review = await this.reviewRepo.findOne({ id, userId: user.id });
    if (!review && user.role == RoleEnum.USER) {
      throw new BadRequestException('User has not rated the course!');
    }
    const result = await this.reviewRepo.findOneOrFail({ id });

    await this.courseKeyMetricService.update(result.courseId, {
      totalReviews: () => '"totalReviews" - 1',
    });
    await this.calRemoveRating(review.courseId, id);
    return result.remove();
  }

  async calInsertRating(courseId: string, rating: number) {
    const reviews = await this.reviewRepo.find({ courseId });

    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    const newRating = (sum + rating) / (reviews.length + 1);

    return this.courseKeyMetricService.update(courseId, { rating: newRating });
  }

  async calRemoveRating(courseId: string, reviewId: string) {
    const reviews = await this.reviewRepo.find({ courseId });

    const sum = reviews
      .filter((review) => review.id !== reviewId)
      .reduce((total, review) => total + review.rating, 0);
    const newRating = sum / (reviews.length - 1);

    return this.courseKeyMetricService.update(courseId, { rating: newRating });
  }

  async calUpdateRating(courseId: string) {
    const reviews = await this.reviewRepo.find({ courseId });

    const totalRating = reviews.reduce(
      (total, review) => total + review.rating,
      0,
    );
    const newRating = totalRating / reviews.length;

    return this.courseKeyMetricService.update(courseId, { rating: newRating });
  }
}
