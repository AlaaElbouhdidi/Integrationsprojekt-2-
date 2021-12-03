import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeEmailData } from '@api-interfaces';

@Component({
  selector: 'mate-team-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrls: ['./change-email-form.component.scss']
})
export class ChangeEmailFormComponent {
    changeEmailForm: FormGroup;
    @Input() loading = false;
    @Output() changeEmailEvent = new EventEmitter<ChangeEmailData>();

    constructor(
        private fb: FormBuilder
    ) {
        this.changeEmailForm = this.fb.group({
            password: new FormControl('', [
                Validators.required
            ]),
            newEmail: new FormControl('', [
                Validators.email,
                Validators.required
            ])
        });
    }

    get password(): AbstractControl {
        return this.changeEmailForm.controls.password;
    }

    get newEmail(): AbstractControl {
        return this.changeEmailForm.controls.newEmail;
    }

    changeEmail(): void {
        const data: ChangeEmailData = {
            password: this.password.value,
            newEmail: this.newEmail.value
        }
        this.changeEmailEvent.emit(data);
        this.changeEmailForm.reset();
    }
}
