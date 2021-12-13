import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { ChangeEmailData } from '@api-interfaces';

@Component({
    selector: 'mate-team-change-email-form',
    templateUrl: './change-email-form.component.html',
    styleUrls: ['./change-email-form.component.scss']
})
export class ChangeEmailFormComponent {
    /**
     * Change email form group
     */
    changeEmailForm: FormGroup;
    /**
     * Loading state
     */
    @Input() loading = false;
    /**
     * Change email event
     */
    @Output() changeEmailEvent = new EventEmitter<ChangeEmailData>();

    /**
     * Constructor which initializes change email reactive form
     * @param fb {FormBuilder}
     */
    constructor(private fb: FormBuilder) {
        this.changeEmailForm = this.fb.group({
            password: new FormControl('', [Validators.required]),
            newEmail: new FormControl('', [
                Validators.email,
                Validators.required
            ])
        });
    }

    /**
     * @returns {AbstractControl} The password input control of the form
     */
    get password(): AbstractControl {
        return this.changeEmailForm.controls.password;
    }

    /**
     * @returns {AbstractControl} The new email input control of the form
     */
    get newEmail(): AbstractControl {
        return this.changeEmailForm.controls.newEmail;
    }

    /**
     * Emits event to parent component with change email data and resets form
     */
    changeEmail(): void {
        const data: ChangeEmailData = {
            password: this.password.value,
            newEmail: this.newEmail.value
        };
        this.changeEmailEvent.emit(data);
        this.changeEmailForm.reset();
    }
}
