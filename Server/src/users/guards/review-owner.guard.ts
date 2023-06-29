import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ReviewRepository } from '../../review/repositories/review.repository';

@Injectable()
export class ReviewOwnerGuard implements CanActivate {
  constructor(private reviewRepo: ReviewRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    const user = request.user;
    const review = await this.reviewRepo.findOne({ id, userId: user.id });
    return !!review;
  }
}
