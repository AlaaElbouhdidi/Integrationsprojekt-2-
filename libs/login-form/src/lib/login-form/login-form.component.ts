import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
  selector: 'integrationsprojekt2-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder
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

    login(): void {
        console.log('login with email and password');
    }

    loginWithGoogle(): void {
        console.log('login with google');
    }

}
