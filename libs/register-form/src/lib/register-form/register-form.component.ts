import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AlertService, AuthService } from '@integrationsprojekt2/services';
import { Router } from '@angular/router';
@Component({
    selector: 'integrationsprojekt2-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
    registerForm: FormGroup;
    loading = false;

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

    get email(): AbstractControl {
        return this.registerForm.controls.email;
    }

    get password(): AbstractControl {
        return this.registerForm.controls.password;
    }

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            this.loading = false;
            this.alertService.addAlert({ type: 'error', message: err.message });
        }
    }
}
