import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { ChangePasswordData } from '@api-interfaces';

@Component({
    selector: 'mate-team-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {
    /**
     * Change password form group
     */
    changePasswordForm: FormGroup;
    /**
     * Loading state
     */
    @Input() loading = false;
    /**
     * Change password event
     */
    @Output() changePasswordEvent = new EventEmitter<ChangePasswordData>();

    /**
     * Constructor which initializes the change password reactive form
     * @param fb {FormBuilder}
     */
    constructor(private fb: FormBuilder) {
        this.changePasswordForm = this.fb.group({
            password: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [
                Validators.minLength(6),
                Validators.required
            ]),
            confirmNewPassword: new FormControl('', [Validators.required])
        });
    }

    /**
     * @returns {AbstractControl} The password input control of the form
     */
    get password(): AbstractControl {
        return this.changePasswordForm.controls.password;
    }

    /**
     * @returns {AbstractControl} The new password input control of the form
     */
    get newPassword(): AbstractControl {
        return this.changePasswordForm.controls.newPassword;
    }

    /**
     * @returns {AbstractControl} The confirm new password input control of the form
     */
    get confirmNewPassword(): AbstractControl {
        return this.changePasswordForm.controls.confirmNewPassword;
    }

    /**
     * Compares new password and confirm password values and sets corresponding errors
     */
    comparePasswords(): void {
        if (this.newPassword.value !== this.confirmNewPassword.value) {
            this.confirmNewPassword.setErrors({ mustMatch: true });
        } else {
            this.confirmNewPassword.setErrors(null);
        }
    }

    /**
     * Emits event to parent component with change password data and resets form
     */
    changePassword(): void {
        const data: ChangePasswordData = {
            oldPassword: this.password.value,
            newPassword: this.newPassword.value
        };
        this.changePasswordEvent.emit(data);
        this.changePasswordForm.reset();
    }
}
