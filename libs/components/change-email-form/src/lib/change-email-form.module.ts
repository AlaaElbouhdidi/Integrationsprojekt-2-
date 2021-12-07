import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEmailFormComponent } from './change-email-form/change-email-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { LoaderModule } from '@loader';
import {
    faExclamationCircle,
    faLock,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        LoaderModule
    ],
    declarations: [
      ChangeEmailFormComponent
    ],
    exports: [ChangeEmailFormComponent]
})
export class ChangeEmailFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faExclamationCircle,
            faLock,
            faEnvelope
        );
    }
}
