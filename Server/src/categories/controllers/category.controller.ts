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
  Query,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { SearchCategoryDto } from '../dto/search-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../users/decorators/auth.decorator';
import { Roles } from '../../users/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/roles.enum';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @Roles(RoleEnum.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  search(@Query() query: SearchCategoryDto) {
    return this.categoryService.search(query);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  @Roles(RoleEnum.ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
