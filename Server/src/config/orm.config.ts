import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env.config';

export const config: TypeOrmModuleOptions = env.DATABASE_URL
  ? {
      type: env.DATABASE.CONNECT,
      url: env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      entities: [`${env.ROOT_PATH}/**/*.entity.js`],
    }
  : {
      type: env.DATABASE.CONNECT,
      host: env.DATABASE.HOST,
      port: env.DATABASE.PORT,
      username: env.DATABASE.USER,
      password: env.DATABASE.PASSWORD,
      database: env.DATABASE.NAME,
      synchronize: true,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      entities: [`${env.ROOT_PATH}/**/*.entity.js`],
    };
