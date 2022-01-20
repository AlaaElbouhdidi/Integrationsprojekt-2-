import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable, switchMap, take } from 'rxjs';
import { AlertService, AuthService, GroupService } from '@services';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
     * @param auth {AngularFireAuth}
     */
    constructor(
        private authService: AuthService,
        private groupService: GroupService,
        private alertService: AlertService,
        private router: Router,
        private auth: AngularFireAuth
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
        return this.auth.authState.pipe(
            take(1),
            switchMap(async (authState) => {
                if (!authState) {
                    await this.router.navigate(['/group']);
                    return false;
                }
                const groupId = route.paramMap.get('id');
                if (!groupId || !authState.email) {
                    await this.router.navigate(['/group']);
                    return false;
                }
                const data = await this.groupService.isAlreadyMember(
                    groupId,
                    authState.email
                );
                if (!data) {
                    await this.router.navigate(['/group']);
                    return false;
                }
                return data;
            })
        );
    }
}
