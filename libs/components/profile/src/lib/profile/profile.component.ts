import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService, AuthService } from '@services';
import firebase from 'firebase/compat';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mate-team-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    /**
     * Subject for unsubscribing from observables
     * @private
     */
    private destroy$ = new Subject();
    /**
     * The currently logged in user or null
     */
    user: firebase.User | null = null;
    activeNavLink: 'password' | 'email' | 'profile' = 'password';
    provider = '';

    /**
     * Constructor of the profile component
     * @param authService {AuthService}
     * @param alertService {AlertService}
     */
    constructor(
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    async reAuthWithGoogle(): Promise<void> {
        try {
            await this.authService.reauthenticateWithPopup();
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    async reAuthWithPassword(password: string): Promise<void> {
        try {
            await this.authService.reauthenticateUser(password);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    setActiveLink(nav: 'password' | 'email' | 'profile'): void {
        this.activeNavLink = nav;
        this.checkProvider();
    }

    checkProvider(): void {
        this.authService.user?.providerData.forEach(provider => {
           if (provider) {
               this.provider = provider.providerId;
           }
        });
    }

    /**
     * Subscribe to auth service for currently logged in user
     */
    ngOnInit(): void {
        this.authService.authState$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => this.user = user);
        this.checkProvider();
    }

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
