import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/users/decorators/auth.decorator';
import { CurrentUser } from 'src/users/decorators/user-current.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { SectionService } from '../services/section.service';
import { CreateSectionDto } from '../dto/create-section.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { Roles } from 'src/users/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/roles.enum';
import { HttpCode } from '@nestjs/common/decorators';

@Controller('courses/:courseId/sections')
@ApiTags('Section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: UserEntity,
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() body: CreateSectionDto,
  ) {
    return this.sectionService.create(user.id, courseId, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.sectionService.getAll(courseId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.sectionService.getOne(courseId, id);
  }

  @Patch(':id')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @CurrentUser() user: UserEntity,
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateSectionDto,
  ) {
    return this.sectionService.update(user.id, courseId, id, body);
  }

  @Delete(':id')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @CurrentUser() user: UserEntity,
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.sectionService.delete(user.id, courseId, id);
  }
}
