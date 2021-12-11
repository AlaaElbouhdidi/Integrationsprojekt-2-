import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
    declarations: [PasswordResetFormComponent],
    exports: [PasswordResetFormComponent]
})
export class PasswordResetFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faLock, faEye, faEyeSlash);
    }
}
