import { CustomDecorator, SetMetadata } from '@nestjs/common';
/**
 * The key that defines a public route
 * */
export const IS_PUBLIC_KEY = 'isPublic';
/**
 * The custom @Public() decorator that marks a route as public
 * */
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
