import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as faker from 'faker';
import { FileUploadRepository } from '../repositories/file-upload.repository';
import { env } from '../../config/env.config';
import { S3Constant } from '../constants/s3.constant';
import { generateSlug } from 'src/core/helpers/slug.helper';

@Injectable()
export class FileUploadService {
  private s3: AWS.S3;

  constructor(private fileUploadRepo: FileUploadRepository) {
    AWS.config.update({
      region: env.AWS_S3.REGION,
      accessKeyId: env.AWS_S3.ACCESS_KEY_ID,
      secretAccessKey: env.AWS_S3.SECRET_ACCESS_KEY,
    });
    this.s3 = new AWS.S3();
  }

  async uploadFile(file: Express.Multer.File, userId: string) {
    const arr_name = file.originalname.split('.');
    const extension = arr_name.pop();
    const params = {
      Bucket: S3Constant.BUCKET_NAME,
      Key: `${faker.datatype.uuid()}-${generateSlug(arr_name[0])}.${extension}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      const result = await this.s3.upload(params).promise();

      const fileUpload = await this.saveFileUpload(
        file.originalname,
        result.Key,
        userId,
      );
      const preSingedUrl = await this.generatePreSignedUrl(fileUpload.key);
      return { fileUpload, preSingedUrl };
    } catch (error) {
      throw new BadRequestException('An error occurred during processing.');
    }
  }

  async generatePreSignedUrl(key: string) {
    try {
      return await this.s3.getSignedUrlPromise('getObject', {
        Bucket: S3Constant.BUCKET_NAME,
        Key: key,
        Expires: S3Constant.EXPIRE_TIME,
      });
    } catch (error) {
      throw new BadRequestException('An error occurred during processing.');
    }
  }

  async saveFileUpload(fileName: string, key: string, userId: string) {
    const data = { fileName, key, userId };
    return await this.fileUploadRepo.save(data);
  }

  async deleteFileUpload(id: string, userId: string) {
    const fileUpload = await this.fileUploadRepo.findOneOrFail({ id, userId });
    if (!fileUpload.key) {
      throw new BadRequestException('An error occurred during processing.');
    }
    await this.deleteFile(fileUpload.key);
    return fileUpload.remove();
  }

  deleteFile(key: string) {
    try {
      const params = {
        Bucket: S3Constant.BUCKET_NAME,
        Key: key,
      };
      return this.s3.deleteObject(params).promise();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('An error occurred during processing.');
    }
  }

  async updateACL(userId: string, fileUploadId: string) {
    try {
      const file = await this.fileUploadRepo.findOne({
        id: fileUploadId,
        userId,
      });
      const params = {
        Bucket: S3Constant.BUCKET_NAME,
        Key: file.key,
        ACL: 'public-read',
      };

      await this.s3.putObjectAcl(params).promise();
      return {
        url: `${this.s3.endpoint.protocol}//${S3Constant.BUCKET_NAME}.${this.s3.endpoint.hostname}/${file.key}`,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('An error occurred during processing.');
    }
  }
}
