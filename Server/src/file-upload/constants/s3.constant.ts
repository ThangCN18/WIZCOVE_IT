import { env } from '../../config/env.config';

export const S3Constant = {
  BUCKET_NAME: env.AWS_S3.BUCKET_NAME,
  EXPIRE_TIME: 3600 * 12,
};
