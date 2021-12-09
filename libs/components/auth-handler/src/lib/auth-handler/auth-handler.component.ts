import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertService, AuthService } from '@services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'mate-team-auth-handler',
    templateUrl: './auth-handler.component.html',
    styleUrls: ['./auth-handler.component.scss']
})
export class AuthHandlerComponent implements OnInit, OnDestroy {
    /**
     * Subject for unsubscribing from observables with takeUntil
     * @private
     */
    private unsubscribe$ = new Subject();
    /**
     * The mode of the user action
     * @private
     */
    private mode = '';
    /**
     * The code to verify
     * @private
     */
    private code = '';
    /**
     * Determines if code is valid or invalid
     */
    codeChecked = false;

    /**
     * Constructor of the auth handler component
     * @param router {Router}
     * @param activatedRoute {ActivatedRoute}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     */
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private alertService: AlertService
    ) {}

    /**
     * Subscribes to activated route and checks mode and code query parameters
     */
    ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(async (params) => {
                if (!params['mode'] || !params['oobCode']) {
                    await this.router.navigate(['/']);
                }
                this.mode = params['mode'];
                this.code = params['oobCode'];
                if (params['mode'] === 'resetPassword') {
                    await this.handleVerifyCode();
                }
                if (params['mode'] === 'verifyEmail') {
                    await this.handleEmailAction('verify');
                }
                if (params['mode'] === 'recoverEmail') {
                    await this.handleEmailAction('recover');
                }
            });
    }

    /**
     * Calls auth service to verify the password reset code and handles success and error cases
     */
    async handleVerifyCode(): Promise<void> {
        try {
            await this.authService.verifyPasswordResetCode(this.code);
            this.codeChecked = true;
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
            await this.router.navigate(['/']);
        }
    }

    /**
     * Calls auth service to verify email and handles success and error cases
     */
    async handleEmailAction(type: 'verify' | 'recover'): Promise<void> {
        try {
            await this.authService.applyActionCode(this.code);
            this.alertService.addAlert({
                type: 'success',
                message:
                    type === 'verify'
                        ? 'Email has been successfully verified.'
                        : 'Email has been successfully recovered.'
            });
            await this.router.navigate(['/']);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
            await this.router.navigate(['/']);
        }
    }

    /**
     * Calls auth service to confirm password reset and handles success and error cases
     *
     * @param newPassword {string} The new password to set
     */
    async handlePasswordReset(newPassword: string): Promise<void> {
        try {
            await this.authService.confirmPasswordReset(this.code, newPassword);
            this.alertService.addAlert({
                type: 'success',
                message: 'Password successfully reset and new password updated.'
            });
            await this.router.navigate(['/login']);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Unsubscribes from subscribed observables
     */
    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }
}
