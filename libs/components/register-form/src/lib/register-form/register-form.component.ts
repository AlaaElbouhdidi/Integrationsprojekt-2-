import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AlertService, AuthService } from '@services';
import { Router } from '@angular/router';

@Component({
    selector: 'mate-team-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
    /**
     * Register Form Group
     */
    registerForm: FormGroup;
    /**
     * Loading state
     */
    loading = false;

    /**
     * Constructor which initializes the reactive register form
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
        this.registerForm = this.fb.group({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
                Validators.minLength(6),
                Validators.required,
            ]),
        });
    }

    /**
     * @returns {AbstractControl} The email input control of the form
     */
    get email(): AbstractControl {
        return this.registerForm.controls.email;
    }

    /**
     * @returns {AbstractControl} The password input control of the form
     */
    get password(): AbstractControl {
        return this.registerForm.controls.password;
    }

    /**
     * Calls auth service to register user with email and password and handles success and error cases
     */
    async register(): Promise<void> {
        try {
            this.loading = true;
            await this.authService.register(
                this.email.value,
                this.password.value
            );
            this.loading = false;
            this.registerForm.reset();
            this.alertService.addAlert({
                type: 'success',
                message:
                    'Successfully logged in with new account. Please verify your email.',
            });
            await this.router.navigate(['/']);
            window.location.reload();
        } catch (e) {
            this.loading = false;
            this.registerForm.reset();
            this.alertService.addAlert({
                type: 'error',
                message: e.message,
            });
        }
    }
}
