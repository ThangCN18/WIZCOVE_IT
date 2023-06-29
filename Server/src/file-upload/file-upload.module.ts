import { S3 } from 'aws-sdk';
import { Module } from '@nestjs/common';
import { FileUploadController } from './controllers/file-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadRepository } from './repositories/file-upload.repository';
import { FileUploadService } from './services/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileUploadRepository])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
