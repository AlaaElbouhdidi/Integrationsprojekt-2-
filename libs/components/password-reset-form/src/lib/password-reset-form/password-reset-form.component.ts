import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector: 'mate-team-password-reset-form',
    templateUrl: './password-reset-form.component.html',
    styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent {
    /**
     * Password reset form group
     */
    passwordResetForm: FormGroup;
    /**
     * Determines if new password input value is readable
     */
    showNewPassword = false;
    /**
     * Determines if confirm password input value is readable
     */
    showConfirmPassword = false;
    /**
     * Form submit event
     */
    @Output() formSubmitEvent = new EventEmitter();

    /**
     * Constructor which initializes the password reset reactive form
     * @param fb {FormBuilder}
     */
    constructor(private fb: FormBuilder) {
        this.passwordResetForm = this.fb.group({
            newPassword: new FormControl('', [
                Validators.minLength(6),
                Validators.required
            ]),
            confirmPassword: new FormControl('', [Validators.required])
        });
    }

    /**
     * @returns {AbstractControl} The new password input control of the form
     */
    get newPassword(): AbstractControl {
        return this.passwordResetForm.controls.newPassword;
    }

    /**
     * @returns {AbstractControl} The confirm password input control of the form
     */
    get confirmPassword(): AbstractControl {
        return this.passwordResetForm.controls.confirmPassword;
    }

    /**
     * Emits event to parent component with new password value and resets form
     */
    resetPassword(): void {
        this.formSubmitEvent.emit(this.newPassword.value);
        this.passwordResetForm.reset();
    }

    /**
     * Compares new password and confirm password values and sets corresponding errors
     */
    comparePasswords(): void {
        if (this.newPassword.value !== this.confirmPassword.value) {
            this.confirmPassword.setErrors({ mustMatch: true });
        } else {
            this.confirmPassword.setErrors(null);
        }
    }
}
