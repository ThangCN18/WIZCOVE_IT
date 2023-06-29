import { ValidationPipe } from '@nestjs/common';

export const validateConfig = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});
