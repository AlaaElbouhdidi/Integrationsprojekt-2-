import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePollFormComponent } from './create-poll-form/create-poll-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faAngleDoubleRight,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    declarations: [
      CreatePollFormComponent
    ],
    exports: [CreatePollFormComponent]
})
export class CreatePollFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faAngleDoubleRight,
            faTrash
        );
    }
}
