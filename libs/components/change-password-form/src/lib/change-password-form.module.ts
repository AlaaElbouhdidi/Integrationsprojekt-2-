import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faLock,
    faEye,
    faEyeSlash,
    faUnlock
} from '@fortawesome/free-solid-svg-icons';
import { LoaderModule } from '@loader';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        LoaderModule
    ],
    declarations: [ChangePasswordFormComponent],
    exports: [ChangePasswordFormComponent]
})
export class ChangePasswordFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faLock, faEye, faEyeSlash, faUnlock);
    }
}
