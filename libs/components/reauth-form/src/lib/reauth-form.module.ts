import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReauthFormComponent } from './reauth-form/reauth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '@loader';
import {
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
    faEnvelope,
    faLock,
    faExclamationCircle,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        LoaderModule
    ],
    declarations: [
      ReauthFormComponent
    ],
    exports: [ReauthFormComponent]
})
export class ReauthFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faEnvelope,
            faLock,
            faExclamationCircle,
            faCheckCircle,
            faTimesCircle,
            faExclamationTriangle
        );
    }
}
