import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mate-team-reauth-form',
  templateUrl: './reauth-form.component.html',
  styleUrls: ['./reauth-form.component.scss']
})
export class ReauthFormComponent {
    reAuthForm: FormGroup;
    @Output() formSubmitEvent = new EventEmitter();

    constructor(
        private fb: FormBuilder
    ) {
        this.reAuthForm = this.fb.group({
            password: new FormControl('', [
                Validators.minLength(6),
                Validators.required
            ]),
        });
    }

    get password(): AbstractControl {
        return this.reAuthForm.controls.password;
    }

    reAuthUser(): void {
        this.formSubmitEvent.emit(this.password.value);
        this.reAuthForm.reset();
    }
}
