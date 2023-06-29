import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user-current.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { EditProfileDto } from '../dto/edit-profile.dto';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../enums/roles.enum';
import { CartService } from '../../cart/services/cart.service';
import { CourseSubscribeService } from '../../courses/services/course-subscribe.service';
import { PaymentService } from '../../payment/services/payment.service';

@Controller('users')
@ApiTags('Users')
@Auth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cartService: CartService,
    private courseSubscribeService: CourseSubscribeService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Put('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  changePass(@CurrentUser() user: UserEntity, @Body() body: ChangePasswordDto) {
    return this.userService.changePass(user.id, body);
  }

  @Put('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  editProfile(@CurrentUser() user: UserEntity, @Body() body: EditProfileDto) {
    return this.userService.editProfile(user.id, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  getUsers(@Query() query: QueryParamsFilterDto) {
    return this.userService.getUsers(query);
  }
  @Get('my-cart')
  @HttpCode(HttpStatus.OK)
  getCartOfUser(@CurrentUser() user: UserEntity) {
    return this.cartService.getCartOfUser(user.id);
  }

  @Get('my-courses')
  @HttpCode(HttpStatus.OK)
  getCoursesOfUser(@CurrentUser() user: UserEntity) {
    return this.courseSubscribeService.getCoursesOfUser(user.id);
  }

  @Get('my-payments')
  @HttpCode(HttpStatus.OK)
  getPaymentsOfUser(@CurrentUser() user: UserEntity) {
    return this.paymentService.getPaymentOfUser(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RoleEnum.ADMIN)
  updateActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.updateActive(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
