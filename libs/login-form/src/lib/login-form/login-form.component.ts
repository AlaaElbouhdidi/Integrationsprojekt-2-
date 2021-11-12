import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { AlertService, AuthService } from '@integrationsprojekt2/services';

@Component({
  selector: 'integrationsprojekt2-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        this.loginForm = this.fb.group({
            email: new FormControl('', [
                Validators.email,
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.minLength(6),
                Validators.required
            ])
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
            await this.authService.login(
                this.email.value,
                this.password.value
            );
            this.loading = false;
            this.loginForm.reset();
            // send user to his group page
        } catch (e: any) {
            this.loading = false;
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    async loginWithGoogle(): Promise<void> {
        try {
            await this.authService.loginWithGoogle();
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }
}
