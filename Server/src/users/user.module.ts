import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { TokenRepository } from './repositories/token.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { BullQueueModule } from 'src/mails/bull-queue.module';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { CourseModule } from '../courses/course.module';
import { CartModule } from '../cart/cart.module';
import { NotificationModule } from '../notification/notification.module';
import { PaymentModule } from '../payment/payment.module';
import { UserProgressService } from './services/user-progress.service';
import { UserProgressRepository } from './repositories/user-progress.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      TokenRepository,
      UserProgressRepository,
    ]),
    BullQueueModule,
    CartModule,
    forwardRef(() => CourseModule),
    NotificationModule,
    PaymentModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    AuthService,
    JwtService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    UserProgressService,
  ],
  exports: [UserService, UserProgressService],
})
export class UsersModule {}
