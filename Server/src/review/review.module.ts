import { Module } from '@nestjs/common';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './repositories/review.repository';
import { CourseModule } from '../courses/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository]), CourseModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
