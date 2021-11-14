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
    selector: 'integrationsprojekt2-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
                Validators.minLength(6),
                Validators.required,
            ]),
        });
    }

    get email(): AbstractControl {
        return this.loginForm.controls.email;
    }

    get password(): AbstractControl {
        return this.loginForm.controls.password;
    }

    async login(): Promise<void> {
        try {
            this.loading = true;
            await this.authService.login(this.email.value, this.password.value);
            this.loading = false;
            this.loginForm.reset();
            this.alertService.addAlert({
                type: 'success',
                message: 'Successfully logged in',
            });
            await this.router.navigate(['/']);
        } catch (e) {
            this.loading = false;
            this.loginForm.reset();
            this.alertService.addAlert({
                type: 'error',
                message: e.message,
            });
        }
    }

    async loginWithGoogle(): Promise<void> {
        try {
            await this.authService.loginWithGoogle();
        } catch (e) {
            if (e.code !== 'auth/popup-closed-by-user') {
                this.alertService.addAlert({
                    type: 'error',
                    message: e.message,
                });
            }
        }
    }
}
