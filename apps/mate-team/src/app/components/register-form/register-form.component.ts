import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  registerForm: FormGroup;

  constructor(
      private fb: FormBuilder
  ) {
      this.registerForm = this.fb.group({
          email: new FormControl('', [Validators.email, Validators.required]),
          password: new FormControl('', [Validators.minLength(6), Validators.required])
      });
  }

  get email() { return this.registerForm.controls.email }

  get password() { return this.registerForm.controls.password }

  register(): void {
      console.log('register user...')
  }

}
