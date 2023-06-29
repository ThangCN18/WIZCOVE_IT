import { Module } from '@nestjs/common';
import { RoadmapService } from './services/roadmap.service';
import { RoadmapController } from './controllers/roadmap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadmapRepository } from './repositories/roadmap.repository';
import { CourseRoadmapRepository } from './repositories/course-roadmap.repository';
import { CourseRoadmapController } from './controllers/course-roadmap.controller';
import { CourseRoadmapService } from './services/course-roadmap.service';
import { CourseModule } from '../courses/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoadmapRepository, CourseRoadmapRepository]),
    CourseModule,
  ],
  controllers: [RoadmapController, CourseRoadmapController],
  providers: [RoadmapService, CourseRoadmapService],
})
export class RoadmapModule {}
