import {
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Observable } from 'rxjs';
/**
 * The FirebaseAuthGuard
 **/
@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
    /**
     * The constructor of the FirebaseAuthGuard
     * @param {Reflector} reflector The reflector injection to make use of reflection
     **/
    constructor(private reflector: Reflector) {
        super();
    }
    /**
     * The FirebaseAuthGuard Logger
     **/
    private logger: Logger = new Logger('FirebaseAuthGuard');
    /**
     * The method that determines whether a request is allowed to be executed
     * if the method has a @Public() decorator, all requests are allowed to be executed
     * if not, then only verified Firebase Auth JWT tokens
     * in the Authorization Header allow for execution
     * @param {ExecutionContext} context The execution context of the request
     * @return {boolean | Promise<boolean> | Observable<boolean>} Whether the request is allowed
     **/
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
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
