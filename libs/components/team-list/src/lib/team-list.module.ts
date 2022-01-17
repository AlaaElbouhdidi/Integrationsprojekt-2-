import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamListComponent } from './team-list/team-list.component';
import { UserIconModule } from '@user-icon';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faTrash,
    faPlus,
    faMinus,
    faUserPlus,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, UserIconModule],
    declarations: [TeamListComponent],
    exports: [TeamListComponent]
})
export class TeamListModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faTrash,
            faPlus,
            faMinus,
            faUserPlus,
            faExclamationCircle
        );
    }
}
