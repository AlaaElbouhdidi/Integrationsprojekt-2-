import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService, AuthService } from '@services';

@Component({
  selector: 'mate-team-auth-handler',
  templateUrl: './auth-handler.component.html',
  styleUrls: ['./auth-handler.component.scss']
})
export class AuthHandlerComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription | undefined;
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
        this.routeSubscription = this.activatedRoute.queryParams.subscribe(async params => {
            if (!params['mode'] || !params['oobCode'] || params['mode'] !== 'resetPassword') {
                await this.router.navigate(['/']);
            }
            this.mode = params['mode'];
            this.code = params['oobCode'];
            if (params['mode'] === 'resetPassword') {
                await this.verifyCode();
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

    async handlePasswordReset(newPassword: string): Promise<void> {
        try {
            await this.authService.getAuth().confirmPasswordReset(this.code, newPassword);
            this.alertService.addAlert({
                type: 'success',
                message: 'Password successfully reset and new password updated.'
            });
            await this.router.navigate(['/']);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    ngOnDestroy(): void {
        this.routeSubscription!.unsubscribe();
    }
}
