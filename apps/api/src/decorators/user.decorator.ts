import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as admin from 'firebase-admin';
/**
 * The custom @User() decorator that grabs the user attribute from the request
 * */
export const User = createParamDecorator(
    (data, ctx: ExecutionContext): admin.auth.DecodedIdToken => {
        return ctx.switchToHttp().getRequest().user;
    }
);
