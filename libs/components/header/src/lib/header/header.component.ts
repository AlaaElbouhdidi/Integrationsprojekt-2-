import { Component, OnDestroy } from '@angular/core';
import { AlertService, AuthService } from '@services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'mate-team-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    authenticated = false;
    authSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.authSubscription = this.authService.authState$.subscribe(
            (state) => {
                state
                    ? (this.authenticated = true)
                    : (this.authenticated = false);
            }
        );
    }

    async logout(): Promise<void> {
        try {
            await this.authService.logout();
            this.alertService.addAlert({
                type: 'success',
                message: 'Successfully logged out',
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message,
            });
        }
        await this.router.navigate(['/']);
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
