import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamFormComponent } from './team-form/team-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faExclamationCircle,
    faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
    declarations: [TeamFormComponent],
    exports: [TeamFormComponent]
})
export class TeamFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faExclamationCircle, faAngleDoubleRight);
    }
}
