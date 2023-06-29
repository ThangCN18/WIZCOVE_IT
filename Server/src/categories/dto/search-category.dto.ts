import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit: number;
}
