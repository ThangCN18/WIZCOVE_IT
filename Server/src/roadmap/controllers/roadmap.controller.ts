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
import { RoadmapService } from '../services/roadmap.service';
import { CreateRoadmapDto } from '../dto/create-roadmap.dto';
import { UpdateRoadmapDto } from '../dto/update-roadmap.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../users/decorators/auth.decorator';
import { Roles } from '../../users/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/roles.enum';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('roadmaps')
@ApiTags('Roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBundleDto: CreateRoadmapDto) {
    return this.roadmapService.create(createBundleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.roadmapService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roadmapService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBundleDto: UpdateRoadmapDto,
  ) {
    return this.roadmapService.update(id, updateBundleDto);
  }

  @Delete(':id')
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.roadmapService.remove(id);
  }
}
