import {
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
    private logger: Logger = new Logger('JwtAuthGuard');
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext) {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(
                IS_PUBLIC_KEY,
                [context.getHandler(), context.getClass()]
            );
            if (isPublic) {
                return true;
            }
            return super.canActivate(context);
        } catch (e) {
            this.logger.error('JWT is invalid');
            throw new UnauthorizedException(e);
        }
    }
}
