import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const env = {
  WEB_URL: process.env.WEB_URL,
  APP_PORT: process.env.APP_PORT || 3000,
  APP_ENV: process.env.APP_ENV,
  APP_PREFIX: process.env.APP_PREFIX || 'api',
  AVATAR_DEFAULT: process.env.AVATAR_DEFAULT,
  JWT: {
    ACCESS_TOKEN: {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: process.env.JWT_EXPIRE_ACCESS,
    },
    REFRESH_TOKEN: {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: process.env.JWT_EXPIRE_REFRESH,
    },
  },
  REDIS: {
    URL: process.env.REDIS_URL,
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT || 6379),
    USER: process.env.REDIS_USER,
    PASS: process.env.REDIS_PASS,
  },
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE: {
    CONNECT: process.env.DATABASE_CONNECT as any,
    HOST: process.env.DATABASE_HOST,
    PORT: +process.env.DATABASE_PORT,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
  },
  FORGOT_PASSWORD_TTL: Number(process.env.FORGOT_PASSWORD_TTL || 15),
  ROOT_PATH: process.cwd() + '/src',
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: Number(process.env.SMTP_PORT),
    USERNAME: process.env.SMTP_USER,
    PASSWORD: process.env.SMTP_PASS,
    FROM: process.env.MAIL_SEND_FROM,
  },
  AWS_S3: {
    REGION: process.env.AWS_REGION,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
