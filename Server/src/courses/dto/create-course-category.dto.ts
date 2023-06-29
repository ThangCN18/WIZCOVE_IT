import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateCourseCategoryDto {
  @ApiProperty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subCategoryId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  courseTopicId?: string;
}
