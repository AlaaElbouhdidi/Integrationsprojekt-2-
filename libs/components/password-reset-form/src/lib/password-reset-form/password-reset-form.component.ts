import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mate-team-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent {

    passwordResetForm: FormGroup;
    showNewPassword = false;
    showConfirmPassword = false;
    @Output() formSubmitEvent = new EventEmitter();

    constructor(
        private fb: FormBuilder
    ) {
        this.passwordResetForm = this.fb.group({
            newPassword: new FormControl('', [
                Validators.minLength(6),
                Validators.required
            ]),
            confirmPassword: new FormControl('', [
                Validators.required
            ])
        });
    }

    get newPassword(): AbstractControl {
        return this.passwordResetForm.controls.newPassword;
    }

    get confirmPassword(): AbstractControl {
        return this.passwordResetForm.controls.confirmPassword;
    }

    resetPassword(): void {
        this.formSubmitEvent.emit(this.newPassword.value);
        this.passwordResetForm.reset();
    }

    comparePasswords(): void {
        if (this.newPassword.value !== this.confirmPassword.value){
            this.confirmPassword.setErrors({ mustMatch: true });
        } else {
            this.confirmPassword.setErrors(null);
        }
    }
}
