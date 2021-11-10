import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  registerForm: FormGroup;
  loading = false;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private alertService: AlertService
  ) {
      this.registerForm = this.fb.group({
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

  get email(): AbstractControl { return this.registerForm.controls.email; }

  get password(): AbstractControl { return this.registerForm.controls.password; }

  async register(): Promise<void> {
      try {
          this.loading = true;
          await this.authService.register(this.email.value, this.password.value);
          this.loading = false;
          this.registerForm.reset();
          this.alertService.addAlert({ type: 'success', message: 'Account successfully created. Please verify your email.' });
      } catch (e) {
          this.loading = false;
          this.alertService.addAlert({ type: 'error', message: e.message });
      }
  }

}
