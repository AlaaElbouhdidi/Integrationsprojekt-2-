import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewgroupFormComponent } from './newgroup-form/newgroup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '@loader';
import { AlertModule } from '@alert';
import { RouterModule } from '@angular/router';

import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faExclamationCircle,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
    faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoaderModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        AlertModule,
        RouterModule
    ],
    declarations: [NewgroupFormComponent],
    exports: [NewgroupFormComponent]
})
export class NewgroupFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faExclamationCircle,
            faCheckCircle,
            faTimesCircle,
            faExclamationTriangle,
            faAngleDoubleRight
        );
    }
}
