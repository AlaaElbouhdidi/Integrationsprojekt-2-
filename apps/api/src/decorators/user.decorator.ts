import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
/**
 * The custom @User() decorator that grabs the user attribute from the request
 * */
export const User = createParamDecorator(
    (data, ctx: ExecutionContext): DecodedIdToken => {
        return ctx.switchToHttp().getRequest().user;
    }
);
