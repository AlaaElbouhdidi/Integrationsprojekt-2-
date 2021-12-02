import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordData } from '@api-interfaces';

@Component({
  selector: 'mate-team-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {
    changePasswordForm: FormGroup;
    @Input() loading = false;
    @Output() changePasswordEvent = new EventEmitter();

    constructor(
        private fb: FormBuilder
    ) {
        this.changePasswordForm = this.fb.group({
            password: new FormControl('', [
                Validators.required
            ]),
            newPassword: new FormControl('', [
                Validators.minLength(6),
                Validators.required
            ]),
            confirmNewPassword: new FormControl('', [
                Validators.required
            ])
        });
    }

    get password(): AbstractControl {
        return this.changePasswordForm.controls.password;
    }

    get newPassword(): AbstractControl {
        return this.changePasswordForm.controls.newPassword;
    }

    get confirmNewPassword(): AbstractControl {
        return this.changePasswordForm.controls.confirmNewPassword;
    }

    comparePasswords(): void {
        if (this.newPassword.value !== this.confirmNewPassword.value){
            this.confirmNewPassword.setErrors({ mustMatch: true });
        } else {
            this.confirmNewPassword.setErrors(null);
        }
    }

    changePassword(): void {
        const data: ChangePasswordData = {
            oldPassword: this.password.value,
            newPassword: this.newPassword.value
        }
        this.changePasswordEvent.emit(data);
        this.changePasswordForm.reset();
    }
}
