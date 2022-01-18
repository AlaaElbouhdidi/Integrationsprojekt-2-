import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService, AuthService, GroupService } from '@services';

/**
 * Group guard
 */
@Injectable({
    providedIn: 'root'
})
export class GroupGuardGuard implements CanActivate {
    /**
     * Constructor group guard
     * @param authService {AuthService}
     * @param groupService {GroupService}
     * @param alertService {AlertService}
     * @param router {Router}
     */
    constructor(
        private authService: AuthService,
        private groupService: GroupService,
        private alertService: AlertService,
        private router: Router
    ) {}

    /**
     * Checks if user can activate route
     * @param route {ActivatedRouteSnapshot}
     * @param state {RouterStateSnapshot}
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const user = this.authService.getUserForGuard();
        if (!user) {
            this.router.navigate(['/group']);
            return false;
        }
        const groupId = route.paramMap.get('id');
        if (!groupId || !user.email) {
            this.router.navigate(['/group']);
            return false;
        }
        return this.groupService
            .isAlreadyMember(groupId, user.email)
            .then((data) => {
                if (data) {
                    return true;
                }
                this.alertService.addAlert({
                    type: 'warn',
                    message:
                        'You are no member of this group anymore. Please reload your page.'
                });
                return false;
            })
            .catch((e) => {
                this.alertService.addAlert({
                    type: 'error',
                    message: e.message
                });
                return false;
            });
    }
}
