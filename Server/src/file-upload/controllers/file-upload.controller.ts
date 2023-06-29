import {
  Controller,
  Post,
  UseInterceptors,
  Req,
  UploadedFile,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/users/decorators/user-current.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { uploadImageFilter } from '../filters/upload-image-filter';
import { FileUploadService } from '../services/file-upload.service';
import {
  BadRequestException,
  HttpStatus,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { Auth } from 'src/users/decorators/auth.decorator';
import { LimitSizeConstant } from '../constants/limit-size.constant';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UpdateACLDto } from '../dto/update-alc.dto';

@Controller('upload')
@Auth()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: LimitSizeConstant.LIMIT_FILE },
      fileFilter: uploadImageFilter,
    }),
  )
  uploadFileToS3(
    @CurrentUser() user: UserEntity,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException('The file has the wrong format.');
    } else {
      return this.fileUploadService.uploadFile(file, user.id);
    }
  }

  @Delete(':fileUploadId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUploadFile(
    @Param('fileUploadId') uploadId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.fileUploadService.deleteFileUpload(uploadId, user.id);
  }

  @Put('update-acl')
  @HttpCode(HttpStatus.OK)
  async updateAcl(@CurrentUser() user: UserEntity, @Body() body: UpdateACLDto) {
    return await this.fileUploadService.updateACL(user.id, body.fileUploadId);
  }
}
