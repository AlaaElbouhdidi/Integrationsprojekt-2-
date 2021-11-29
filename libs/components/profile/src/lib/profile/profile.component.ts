import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services';
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

    /**
     * Constructor of the profile component
     * @param authService {AuthService}
     */
    constructor(
        private authService: AuthService
    ) { }

    /**
     * Subscribe to auth service for currently logged in user
     */
    ngOnInit(): void {
        this.authService.authState$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => this.user = user);
    }

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
