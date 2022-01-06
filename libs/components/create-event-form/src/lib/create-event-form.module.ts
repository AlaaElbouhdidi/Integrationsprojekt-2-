import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventFormComponent } from './create-event-form/create-event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faExclamationCircle, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    declarations: [
      CreateEventFormComponent
    ],
    exports: [CreateEventFormComponent]
})
export class CreateEventFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faExclamationCircle,
            faAngleDoubleRight
        );
    }
}
