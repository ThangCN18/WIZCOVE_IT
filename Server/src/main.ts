import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './config/env.config';
import { validateConfig } from './config/validate.config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(validateConfig);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Courses RESTFUL APIs')
    .setDescription('The courses API description')
    .setVersion('1.0')
    .addTag('courses')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(env.APP_PREFIX, app, document);
  app.useStaticAssets(join(env.ROOT_PATH, 'static'), {
    prefix: `/${env.APP_PREFIX}`,
  });
  await app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port ${process.env.PORT || 3000}`),
  );
}

bootstrap();
