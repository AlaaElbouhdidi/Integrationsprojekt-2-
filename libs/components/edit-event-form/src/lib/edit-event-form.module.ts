import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEventFormComponent } from './edit-event-form/edit-event-form.component';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import {
    faExclamationCircle,
    faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
    declarations: [EditEventFormComponent],
    exports: [EditEventFormComponent]
})
export class EditEventFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faExclamationCircle, faAngleDoubleRight);
    }
}
