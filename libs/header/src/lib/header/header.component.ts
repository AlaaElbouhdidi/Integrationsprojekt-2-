import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@integrationsprojekt2/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'integrationsprojekt2-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    authenticated = false;
    authSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.authSubscription = this.authService.authState$
            .subscribe(state => {
                state ? this.authenticated = true : this.authenticated = false;
            });
    }

    async logout(): Promise<void> {
        await this.authService.logout();
        await this.router.navigate(['/']);
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
