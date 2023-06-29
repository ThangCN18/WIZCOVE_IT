import { BaseRepository } from '../../core/repositories/base.repository';
import { FileUploadEntity } from '../entities/file-upload.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(FileUploadEntity)
export class FileUploadRepository extends BaseRepository<FileUploadEntity> {}
