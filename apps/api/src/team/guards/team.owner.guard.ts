import {
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { Observable } from 'rxjs';
import { GroupService } from '../../group/service/group.service';
import { TeamService } from '../service/team.service';
/**
 * The TeamOwnerGuard
 **/
@Injectable()
export class TeamOwnerGuard {
    /**
     * The constructor of the TeamOwnerGuard
     * @param {Reflector} reflector The reflector injection to make use of reflection
     **/
    constructor(
        private groupService: GroupService,
        private teamService: TeamService,
        private reflector: Reflector
    ) {}
    /**
     * The TeamOwnerGuardLogger
     **/
    private logger: Logger = new Logger('TeamOwnerGuardLogger');
    /**
     * The method that determines whether a request is allowed to be executed
     * if the method has a @Public() decorator, all requests are allowed to be executed
     * if not, then only the users who own the group
     * are allowed to execute the request
     * or anyone, if the group has no members
     * @param {ExecutionContext} context The execution context of the request
     * @return {Promise<boolean | Observable<boolean>>} Whether the request is allowed
     **/
    async canActivate(
        context: ExecutionContext
    ): Promise<boolean | Observable<boolean>> {
        try {
            this.logger.debug(`Triggered`);
            const isPublic = this.reflector.getAllAndOverride<boolean>(
                IS_PUBLIC_KEY,
                [context.getHandler(), context.getClass()]
            );
            if (isPublic) {
                return true;
            }
            const { user, params } = context.switchToHttp().getRequest();
            if (params.groupId) {
                const group = await this.groupService.findOne(params.groupId);
                if (!group.member.length) {
                    return true;
                }
                const admins = group.member?.filter(
                    (member) => member.uid === user.uid && member.isAdmin
                );
                return admins.length > 0;
            }
            const { groupId } = await this.teamService.findOne(params.id);
            const group = await this.groupService.findOne(groupId);
            if (!group.member.length) {
                return true;
            }
            const admins = group.member?.filter(
                (member) => member.uid === user.uid && member.isAdmin
            );
            return admins.length > 0;
        } catch (e) {
            if (e.status === 404) {
                throw new NotFoundException(e.message);
            } else {
                throw new InternalServerErrorException(e);
            }
        }
    }
}
