import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CurrentUser } from '../../users/decorators/user-current.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { Auth } from '../../users/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('course/:courseId/cart')
@Auth()
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: UserEntity, @Param('courseId') courseId: string) {
    return this.cartService.create(user.id, courseId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() user: UserEntity, @Param('courseId') courseId: string) {
    return this.cartService.remove(user.id, courseId);
  }
}
