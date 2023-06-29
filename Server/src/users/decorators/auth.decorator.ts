import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CanActivate } from '@nestjs/common/interfaces';
import { isEmpty } from 'lodash';

export function Auth(...extendGuards: (Function | CanActivate)[]) {
  const temp = isEmpty(extendGuards) ? [AuthGuard('jwt')] : extendGuards;
  return applyDecorators(ApiBearerAuth(), UseGuards(...temp, RolesGuard));
}
