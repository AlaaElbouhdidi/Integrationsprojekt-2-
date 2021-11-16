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
    private unsubscribe$ = new Subject();
    private mode = '';
    private code = '';
    codeChecked = false;

    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(async params => {
                if (!params['mode'] || !params['oobCode']) {
                    await this.router.navigate(['/']);
                }
                this.mode = params['mode'];
                this.code = params['oobCode'];
                if (params['mode'] === 'resetPassword') {
                    await this.verifyCode();
                }
                if (params['mode'] === 'verifyEmail') {
                    await this.handleVerifyEmail();
                }
        });
    }

    async verifyCode(): Promise<void> {
        try {
            await this.authService.getAuth().verifyPasswordResetCode(this.code);
            this.codeChecked = true;
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
            await this.router.navigate(['/']);
        }
    }

    async handleVerifyEmail(): Promise<void> {
        try {
            await this.authService.getAuth().applyActionCode(this.code);
            this.alertService.addAlert({
                type: 'success',
                message: 'Email has been successfully verified.'
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

    async handlePasswordReset(newPassword: string): Promise<void> {
        try {
            await this.authService.getAuth().confirmPasswordReset(this.code, newPassword);
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

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
