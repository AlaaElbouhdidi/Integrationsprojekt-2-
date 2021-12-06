import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService, AuthService } from '@services';
import firebase from 'firebase/compat';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    ChangeEmailData,
    ChangePasswordData,
    ChangeProfileData
} from '@api-interfaces';

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
    activeNavLink: 'password' | 'email' | 'profile' = 'profile';
    provider = '';
    loading = false;

    /**
     * Constructor of the profile component
     * @param authService {AuthService}
     * @param alertService {AlertService}
     */
    constructor(
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    async changePassword(data: ChangePasswordData): Promise<void> {
        this.loading = true;
        try {
            await this.authService.reauthenticateUser(data.oldPassword);
            await this.authService.updatePassword(data.newPassword);
            this.alertService.addAlert({
                type: 'success',
                message: 'Successfully updated password'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
        this.loading = false;
    }

    async changeEmail(data: ChangeEmailData): Promise<void> {
        this.loading = true;
        try {
            await this.authService.reauthenticateUser(data.password);
            await this.authService.updateEmail(data.newEmail);
            await this.authService.sendEmailVerification();
            this.alertService.addAlert({
                type: 'success',
                message: 'Successfully updated email. Please verify your new email.'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
        this.loading = false;
    }

    async changeProfile(data: ChangeProfileData): Promise<void> {
        this.loading = true;
        try {
            await this.authService.updateProfile(data.displayName, data.photoURL);
            this.alertService.addAlert({
                type: 'success',
                message: 'Successfully updated user profile.'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
        this.loading = false;
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
