import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { AlertService, AuthService } from '@services';
import { Router } from '@angular/router';

@Component({
    selector: 'mate-team-email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent {
    /**
     * Email form group
     */
    emailForm: FormGroup;
    /**
     * Loading state for loading component
     */
    loading = false;
    /**
     * Event to emit to parent component when form is canceled
     */
    @Output() cancelResetEvent = new EventEmitter();

    /**
     * Constructor which initializes the reactive email form
     * @param fb {FormBuilder}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     * @param router {Router}
     */
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.emailForm = this.fb.group({
            email: new FormControl('', [Validators.email, Validators.required])
        });
    }

    /**
     * @returns {AbstractControl} The email input control of the form
     */
    get email(): AbstractControl {
        return this.emailForm.controls.email;
    }

    /**
     * Emits cancel reset event to parent component
     */
    cancelReset(): void {
        this.cancelResetEvent.emit();
    }

    /**
     * Calls auth service to reset password and handles success and error cases
     */
    async resetPassword(): Promise<void> {
        try {
            this.loading = true;
            await this.authService.resetPassword(this.email.value);
            this.alertService.addAlert({
                type: 'success',
                message: 'Email for password reset has been sent'
            });
            this.loading = false;
            this.emailForm.reset();
            await this.router.navigate(['/']);
        } catch (e) {
            this.loading = false;
            this.emailForm.reset();
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }
}
