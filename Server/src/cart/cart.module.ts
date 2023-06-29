import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './repositories/cart.repository';
import { CourseModule } from '../courses/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository]), CourseModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
