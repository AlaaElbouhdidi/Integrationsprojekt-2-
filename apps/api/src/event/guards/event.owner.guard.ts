import {
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { Observable } from 'rxjs';
import { EventService } from '../service/event.service';
/**
 * The EventOwnerGuard
 **/
@Injectable()
export class EventOwnerGuard {
    /**
     * The constructor of the EventOwnerGuard
     * @param {Reflector} reflector The reflector injection to make use of reflection
     **/
    constructor(
        private eventService: EventService,
        private reflector: Reflector
    ) {}
    /**
     * The EventOwnerGuardLogger
     **/
    private logger: Logger = new Logger('EventOwnerGuardLogger');
    /**
     * The method that determines whether a request is allowed to be executed
     * if the method has a @Public() decorator, all requests are allowed to be executed
     * if not, then only the users who own the event
     * are allowed to execute the request
     * @param {ExecutionContext} context The execution context of the request
     * @return {Promise<boolean | Observable<boolean>>} Whether the request is allowed
     **/
    async canActivate(
        context: ExecutionContext
    ): Promise<boolean | Observable<boolean>> {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(
                IS_PUBLIC_KEY,
                [context.getHandler(), context.getClass()]
            );
            if (isPublic) {
                return true;
            }
            const { user, params } = context.switchToHttp().getRequest();
            const { owner } = await this.eventService.findOne(params.id);
            return owner === user.uid;
        } catch (e) {
            if (e.status === 404) {
                throw new NotFoundException(e.message);
            } else {
                throw new InternalServerErrorException(e);
            }
        }
    }
}
