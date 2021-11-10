import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import {
    FontAwesomeModule,
    FaIconLibrary,
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
    imports: [CommonModule, FontAwesomeModule],
    declarations: [AlertComponent],
    exports: [AlertComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertModule {
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
