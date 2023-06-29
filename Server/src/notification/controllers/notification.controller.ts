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
} from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Auth } from '../../users/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../users/decorators/user-current.decorator';
import { UserEntity } from '../../users/entities/user.entity';

@Controller('notifications')
@Auth()
@ApiTags('Notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser() user: UserEntity) {
    return this.notificationService.findAll(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificationService.findOne(user.id, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @CurrentUser() user: UserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificationService.remove(user.id, id);
  }
}
