// src/common/decorators/public.decorator.ts
import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class PublicRouteChecker {
  constructor(private readonly reflector: Reflector) {}

  isPublicRoute(context: ExecutionContext): boolean {
    const target = context.getClass();
    return this.reflector.get(IS_PUBLIC_KEY, target) === true;
  }
}
