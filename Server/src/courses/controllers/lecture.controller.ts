import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/users/decorators/auth.decorator';
import { CurrentUser } from 'src/users/decorators/user-current.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { LectureService } from '../services/lecture.service';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { UpdateLectureDto } from '../dto/update-lecture.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Roles } from '../../users/decorators/roles.decorator';
import { RoleEnum } from 'src/users/enums/roles.enum';
import { HttpCode } from '@nestjs/common/decorators';
import { UserProgressService } from '../../users/services/user-progress.service';

@Controller('sections/:sectionId/lectures')
@ApiTags('Lecture')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private userProgressService: UserProgressService,
  ) {}

  @Post()
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: UserEntity,
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Body() body: CreateLectureDto,
  ) {
    return this.lectureService.create(user.id, sectionId, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Param('sectionId', ParseUUIDPipe) sectionId: string) {
    return this.lectureService.getAll(sectionId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('id') id: string,
  ) {
    return this.lectureService.getOne(sectionId, id);
  }

  @Patch(':id')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @CurrentUser() user: UserEntity,
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('id') id: string,
    @Body() body: UpdateLectureDto,
  ) {
    return this.lectureService.update(user.id, sectionId, id, body);
  }

  @Delete(':id')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @CurrentUser() user: UserEntity,
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('id') id: string,
  ) {
    return this.lectureService.delete(user.id, sectionId, id);
  }
  @Get(':id/progress')
  @Auth()
  @HttpCode(HttpStatus.OK)
  getLectureProgress(
    @CurrentUser() user: UserEntity,
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userProgressService.getUserProgress(user.id, sectionId, id);
  }
  @Put(':id/completed')
  @Auth()
  @HttpCode(HttpStatus.CREATED)
  completed(
    @CurrentUser() user: UserEntity,
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userProgressService.completed(user.id, sectionId, id);
  }
}
